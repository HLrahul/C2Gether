"use client";

import { useParams } from "next/navigation";
import { Skeleton } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

import "@/styles/video-player.css";

import { socket } from "@/lib/socket";
import { useVideoIdStore } from "@/store/videoIdStore";

import JoinRoomPrompt from "./JoinRoomPrompt";

export default function VideoPlayer() {
  const { videoId } = useVideoIdStore();
  const setVideoId = useVideoIdStore((state) => state.setVideoId);

  const playerRef = useRef<YT.Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { roomId } = useParams();

  useEffect(() => {
    console.log("running useEffect()")
    socket.emit("client-ready", roomId);

    socket.on("client-loaded", () => {
      console.log("client-loaded");
      setIsLoading(false);
    });

    socket.on("get-player-state", () => {
      console.log("got: get-player-state");
      if (playerRef && playerRef.current) {
        console.log("sending: send-player-state");
        const currentTime = playerRef.current.getCurrentTime();
        socket.emit("send-player-state", { videoId, currentTime });
      }
    });

    socket.on('player-state-from-server', ({ videoId, currentTime }: { videoId: string, currentTime: number }) => {
      console.log("got: player-state-from-server" + "TimeStamp: " + currentTime + "VideoId: " + videoId);
      setVideoId(videoId);
      if (playerRef && playerRef.current) {
        playerRef.current.seekTo(currentTime, true);
      }
    })

    return () => {
      socket.off("client-loaded");
      socket.off("get-player-state");
      socket.off("player-state-from-server");
    };
  }, [roomId, videoId, setVideoId]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <JoinRoomPrompt
        roomId={roomId && (typeof roomId === "string" ? roomId : roomId[0])}
      />

      <div className="col-span-8 row-span-2 md:col-span-5">
        {isLoading ? (
          <Skeleton
            isLoaded={isLoading}
            className="h-[40vh] bg-default-200 rounded-lg"
          >
            <div className="h-[40vh] bg-default-200"></div>
          </Skeleton>
        ) : (
          <div className="video-responsive">
            <YouTube
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
              }}
              videoId={videoId}
              opts={opts}
              onReady={onPlayerReady}
            />
          </div>
        )}
      </div>
    </>
  );
}

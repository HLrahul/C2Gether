"use client";

import { Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import YouTube, { YouTubeProps } from "react-youtube";

import "@/styles/video-player.css";

import { socket } from "@/lib/socket";
import { useVideoIdStore } from "@/store/videoIdStore";

import JoinRoomPrompt from "./JoinRoomPrompt";

export default function VideoPlayer() {
  const { videoId } = useVideoIdStore();

  const [isLoading, setIsLoading] = useState(true);

  const { roomId } = useParams();

  useEffect(() => {
    socket.emit("client-ready", roomId);

    socket.on("client-loaded", () => {
      setIsLoading(false);
    });

    socket.on("get-player-state", () => {});
  }, [roomId]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
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

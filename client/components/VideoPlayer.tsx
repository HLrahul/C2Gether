"use client";

import { useParams } from "next/navigation";
import { Skeleton } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

import "@/styles/video-player.css";

import { socket } from "@/lib/socket";
import { useUserStore } from "@/store/userStore";
import { useVideoIdStore } from "@/store/videoIdStore";

import JoinRoomPrompt from "./JoinRoomPrompt";

export default function VideoPlayer() {
  const { roomId } = useParams();
  const { user } = useUserStore();
  const { videoId } = useVideoIdStore();
  const playerRef = useRef<YT.Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const setVideoId = useVideoIdStore((state) => state.setVideoId);

  const [timeStamp, setTimeStamp] = useState(0);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    console.log("Am I admin: " + isAdmin);
    if (isAdmin) socket.emit('video-change', { roomId, videoId });
  }, [isAdmin, roomId, videoId]);

  useEffect(() => {
    socket.emit("client-ready", roomId);

    console.log("User ID: " + user?.id);
    socket.emit("is-admin", { roomId, userId: user?.id });
    socket.on("admin-user", (isAdminMember) => {
      setIsAdmin(isAdminMember);
    })

    socket.on("client-loaded", () => {
      setIsLoading(false);
    });

    socket.on("get-player-state", () => {
      if (playerRef && playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime() + 2;
        socket.emit("send-player-state", { roomId, videoId, currentTime });
      }
    });

    socket.on('player-state-from-server', ({ videoId, currentTime }: { videoId: string, currentTime: number }) => {
      setVideoId(videoId);
      setTimeStamp(currentTime);
    })

    socket.on("video-change-from-server", (videoId) => {
      setVideoId(videoId);
    });

    return () => {
      socket.off("client-loaded");
      socket.off("get-player-state");
      socket.off("player-state-from-server");
    };
  }, [roomId, videoId, setVideoId, user?.id]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;

    event.target.playVideo();
    event.target.seekTo(timeStamp, true);
  };

  const onPlayerPlay: YouTubeProps["onPlay"] = (event) => {
    socket.emit("player-play", { roomId })

    socket.on('player-play-from-server', () => {
      event.target.playVideo();
    })
  }

  const onPlayerPause: YouTubeProps["onPause"] = (event) => {
    const currentTime = event.target.getCurrentTime();
    socket.emit("player-pause", { roomId, currentTime });

    socket.on('player-pause-from-server', (currentTime) => {
      event.target.seekTo(currentTime, true);
      event.target.pauseVideo();
    })
  }

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      autoplay: 1,
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
              onPlay={onPlayerPlay}
              onPause={onPlayerPause}
            />
          </div>
        )}
      </div>
    </>
  );
}

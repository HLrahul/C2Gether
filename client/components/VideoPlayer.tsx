"use client";

import { useParams } from "next/navigation";
import { Skeleton } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

import "@/styles/video-player.css";
import { socket } from "@/lib/socket";
import JoinRoomPrompt from "./JoinRoomPrompt";
import { useAdminStore, useUserStore } from "@/store/userStore";
import { useVideoIdStore } from "@/store/videoIdStore";

export default function VideoPlayer() {
  const { roomId } = useParams();
  const { user } = useUserStore();
  const { isAdmin } = useAdminStore();
  const { videoId } = useVideoIdStore();
  const playerRef = useRef<YT.Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeStamp, setTimeStamp] = useState<number>(0);
  const setIsAdmin = useAdminStore((state) => state.setIsAdmin);
  const setVideoId = useVideoIdStore((state) => state.setVideoId);

  useEffect(() => {
    if (isAdmin) socket.emit("video-change", { roomId, videoId });

    socket.on("video-change-from-server", setVideoId);
    socket.emit("client-ready", roomId);
    socket.emit("is-admin", { roomId, userId: user?.id });
    socket.on("admin-user", setIsAdmin);
    socket.on("client-loaded", () => setIsLoading(false));
    socket.on("get-player-state", () => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime() + 2;
        socket.emit("send-player-state", { roomId, videoId, currentTime });
      }
    });
    socket.on("player-state-from-server", ({ videoId, currentTime }) => {
      setVideoId(videoId);
      setTimeStamp(currentTime);
    });
    socket.on("player-play-from-server", () => {
      if (
        playerRef.current &&
        playerRef.current.getPlayerState() !== YT.PlayerState.PLAYING
      ) {
        playerRef.current.playVideo();
      }
    });
    socket.on("player-pause-from-server", (currentTime) => {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime, true);
        playerRef.current.pauseVideo();
      }
    });
    socket.on("player-seek-from-server", (currentTime) => {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime, true);
      }
    });
    socket.on("playback-rate-change-from-server", (playbackRate) => {
      if (playerRef.current) {
        playerRef.current.setPlaybackRate(playbackRate);
      }
    });

    return () => {
      socket.off("admin-user");
      socket.off("client-loaded");
      socket.off("get-player-state");
      socket.off("player-seek-from-server");
      socket.off("player-play-from-server");
      socket.off("player-pause-from-server");
      socket.off("player-state-from-server");
      socket.off("video-change-from-server");
      socket.off("playback-rate-change-from-server");
    };
  }, [isAdmin, setIsAdmin, roomId, videoId, setVideoId, user?.id]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    event.target.playVideo();
    if (timeStamp !== 0) event.target.seekTo(timeStamp, true);
  };

  const onPlayerPlay: YouTubeProps["onPlay"] = () =>
    socket.emit("player-play", { roomId });
  const onPlayerPause: YouTubeProps["onPause"] = (event) =>
    socket.emit("player-pause", {
      roomId,
      currentTime: event.target?.getCurrentTime() || 0,
    });

  let lastPlayerState = -1;
  const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (event.data === YT.PlayerState.BUFFERING && lastPlayerState === YT.PlayerState.PAUSED) {
      socket.emit("player-seek", {
        roomId,
        currentTime: event.target.getCurrentTime(),
      });
    }
    lastPlayerState = event.data;
  };

  const onPlaybackRateChange: YouTubeProps["onPlaybackRateChange"] = (event) =>
    socket.emit("playback-rate-change", {
      roomId,
      playbackRate: event.target.getPlaybackRate(),
    });

  const opts: YouTubeProps["opts"] = { playerVars: { autoplay: 1, rel: 0 } };

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
            <div className="h-[50vh] bg-default-200"></div>
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
              onStateChange={onPlayerStateChange}
              onPlaybackRateChange={onPlaybackRateChange}
            />
          </div>
        )}
      </div>
    </>
  );
}
"use client";

import { useParams } from "next/navigation";
import { Skeleton } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import "@/styles/video-player.css";
import { socket } from "@/lib/socket";
import JoinRoomPrompt from "./JoinRoomPrompt";
import { useVideoIdStore } from "@/store/videoIdStore";
import { useAdminStore, useUserStore } from "@/store/userStore";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoPlayer() {
  const { roomId } = useParams();
  const { user } = useUserStore();
  const { isAdmin } = useAdminStore();
  const { videoId } = useVideoIdStore();
  const playerRef = useRef<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serverTimeStamp, setServerTimeStamp] = useState<number>(0);
  const setIsAdmin = useAdminStore((state) => state.setIsAdmin);
  const setVideoId = useVideoIdStore((state) => state.setVideoId);

  useEffect(() => {
    if (videoId) {
      socket.emit("video-change", { roomId, videoId });
    }
    socket.on("video-change-from-server", (videoId) => {
      setVideoId(videoId);
    });

    return () => {
      socket.off("video-change-from-server");
    };
  }, [videoId, roomId, setVideoId]);

  useEffect(() => {
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
      setServerTimeStamp(currentTime);
    });

    socket.on("player-play-from-server", () => {
      if (playerRef.current && !playerRef.current.isPlaying) {
        playerRef.current.play();
      }
    });

    socket.on("player-pause-from-server", (currentTime) => {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime);
        playerRef.current.pause();
      }
    });

    socket.on("player-seek-from-server", (currentTime) => {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime);
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
      socket.off("playback-rate-change-from-server");
    };
  }, [isAdmin, setIsAdmin, roomId, videoId, setVideoId, user?.id]);

  const onPlayerReady = () => {
    if (playerRef.current) {
      const internalPlayer = playerRef.current.getInternalPlayer() as any;
      if (internalPlayer.getPlayerState() !== YT.PlayerState.UNSTARTED) {
        internalPlayer.seekTo(serverTimeStamp, true);
        socket.emit("player-pause", { roomId, currentTime: serverTimeStamp });
      }
    }
  };

  const onPlayerPlay = () => {
    socket.emit("player-play", { roomId });
  };

  const onPlayerPause = () => {
    if (playerRef.current) {
      const internalPlayer = playerRef.current.getInternalPlayer() as any;
      const currentTime =
        typeof internalPlayer.getCurrentTime === "function"
          ? internalPlayer.getCurrentTime()
          : 0;
      socket.emit("player-pause", { roomId, currentTime });
    }
  };

  const onPlayerSeek = (seconds: number) => {
    if (Math.abs(seconds - serverTimeStamp) > 2) {
      socket.emit("player-seek", {
        roomId,
        currentTime: seconds,
      });
    }
  };

  const onPlayerProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    if (Math.abs(playedSeconds - serverTimeStamp) > 2) {
      socket.emit("player-seek", {
        roomId,
        currentTime: playedSeconds,
      });
    }
  };

  const onPlayerPlaybackRateChange = (playbackRate: number) => {
    socket.emit("playback-rate-change", { roomId, playbackRate });
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
            className="h-[50vh] bg-default-200 rounded-lg"
          >
            <div className="h-[50vh] bg-default-200"></div>
          </Skeleton>
        ) : (
          <div className="video-responsive">
            <ReactPlayer
              ref={playerRef}
              className="react-player"
              width="100%"
              height="100%"
              pip={true}
              controls={true}
              playing={true}
              url={`https://www.youtube.com/watch?v=${videoId}`}
              onReady={onPlayerReady}
              onPlay={onPlayerPlay}
              onPause={onPlayerPause}
              onSeek={onPlayerSeek}
              onBuffer={onPlayerPause}
              onBufferEnd={onPlayerPlay}
              onProgress={onPlayerProgress}
              onPlaybackRateChange={onPlayerPlaybackRateChange}
            />
          </div>
        )}
      </div>
    </>
  );
}

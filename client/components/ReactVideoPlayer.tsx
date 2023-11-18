"use client";

import "@/styles/video-player.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import dynamic from "next/dynamic";
import { socket } from "@/lib/socket";
import JoinRoomPrompt from "./JoinRoomPrompt";
import { useVideoIdStore } from "@/store/videoIdStore";
import { useAdminStore, useUserStore } from "@/store/userStore";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function ReactVideoPlayer() {
  const { roomId } = useParams();
  const { user } = useUserStore();
  const { videoId } = useVideoIdStore();
  const setVideoId = useVideoIdStore((state) => state.setVideoId);
  const [serverTimeStamp, setServerTimeStamp] = useState<number>(0);
  const setIsAdmin = useAdminStore((state) => state.setIsAdmin);

  const [player, setPlayer] = useState<any>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (player && videoId) {
        socket.emit("video-change", { roomId, videoId });
    }
    socket.on("video-change-from-server", (videoId) => { setServerTimeStamp(0); setVideoId(videoId); });

    return () => {
      socket.off("video-change-from-server");
    }
  }, [videoId, player, roomId, setVideoId]);

  useEffect(() => {
    socket.emit("client-ready", roomId);
    socket.emit("is-admin", { roomId, userId: user?.id });
    socket.on("admin-user", setIsAdmin);
    socket.on("client-loaded", () => {
      if (player) {
        socket.emit("get-player-state", { roomId, videoId });
      }
    });
    socket.on("player-state-from-server", ({ videoId, currentTime }) => {
      setVideoId(videoId);
      setServerTimeStamp(currentTime);
      if (player && currentTime) {
        player.seekTo(currentTime);
      }
    });
    socket.on("player-play-from-server", () => {
      if (player) {
        player.play();
      }
    });
    socket.on("player-pause-from-server", () => {
      if (player) {
        player.pause();
      }
    });
    socket.on("player-seek-from-server", (currentTime) => {
      if (player) {
        player.seekTo(currentTime);
      }
    });
    socket.on("player-playback-rate-from-server", (playbackRate) => {
      if (player) {
        player.setPlaybackRate(playbackRate);
      }
    });

  }, [roomId, player, videoId, setVideoId, user, setIsAdmin]);

  useEffect(() => {
    console.log(player);
  }, [player]);

  const onReady = (player: any) => {
    setPlayer(player);
    if(serverTimeStamp !== 0) {
        player.seekTo(serverTimeStamp);
    }
    socket.emit("player-pause", { roomId, currentTime: serverTimeStamp });
  }
  const onPlay = () => {
    setIsPlaying(true);
    if (player) {
      socket.emit("player-play", { roomId });
    }
  }
  const onPause = () => {
    setIsPlaying(false);
    if (player) {
      socket.emit("player-pause", {
        roomId,
        currentTime: player.getCurrentTime() || 0,
      });
    }
  }
  const onBuffer = () => {
    setIsPlaying(false);
    socket.emit("player-pause", { roomId, currentTime: player.getCurrentTime() || 0 });
  }
  const onBufferEnd = () => {
    setIsPlaying(true);
    socket.emit("player-play", { roomId });
  }
  const onSeek = (seek: number) => {
    socket.emit("player-seek", { roomId, currentTime: seek });
  }
  const onPlaybackRateChange = (playbackRate: number) => {
    socket.emit("player-playback-rate", { roomId, playbackRate });
  }

  return (
    <>
    <JoinRoomPrompt
        roomId={roomId && (typeof roomId === "string" ? roomId : roomId[0])}
    />

    <div className="col-span-8 row-span-2 md:col-span-5">
      <div className="video-responsive">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          className="react-player"
          height="100%"
          width="100%"
          controls={true}
          playing={isPlaying}
          muted={true}
          pip={true}
          stopOnUnmount={false}
          onReady={onReady}
          onStart={() => setIsStarted(true)}
          onPlay={onPlay}
          onPause={onPause}
          onBuffer={onBuffer}
          onBufferEnd={onBufferEnd}
          onSeek={onSeek}
          onPlaybackRateChange={onPlaybackRateChange}
        />
      </div>
    </div>
    </>
  );
}

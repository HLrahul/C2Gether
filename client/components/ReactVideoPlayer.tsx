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
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (player && videoId) {
      socket.emit("video-change", { roomId, videoId });
    }
  }, [videoId, player, roomId]);


  useEffect(() => {
    socket.emit("client-ready", roomId);
    socket.emit("is-admin", { roomId, userId: user?.id });
    socket.on("admin-user", setIsAdmin);
    socket.on("client-loaded", () => {});
    socket.on("get-player-state", () => {
      if (player) {
        const currentTime = player.getCurrentTime() + 2;
        socket.emit("send-player-state", { roomId, videoId, currentTime });
      }
    });
    socket.on("player-state-from-server", ({ videoId, currentTime }) => {
      setVideoId(videoId);
      setServerTimeStamp(currentTime);
      if (player && currentTime) {
        player.seekTo(currentTime);
      }
    });
    socket.on("video-change-from-server", (videoId) => {
      setVideoId(videoId);
    });
    socket.on("player-play-from-server", () => {
      if (player) {
        setIsPlaying(true);
      }
    });
    socket.on("player-pause-from-server", (membersCurrentTime) => {
      setIsPlaying(false);
      if (player) {
        player.seekTo(membersCurrentTime);
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

    return () => {
      socket.off("admin-user");
      socket.off("client-loaded");
      socket.off("get-player-state");
      socket.off("player-seek-from-server");
      socket.off("player-play-from-server");
      socket.off("video-change-from-server");
      socket.off("player-pause-from-server");
      socket.off("player-state-from-server");
      socket.off("playback-rate-change-from-server");
    };
  }, [roomId, player, videoId, setVideoId, user, setIsAdmin]);

  const onReady = (player: any) => {
    setPlayer(player); 
    player.seekTo(serverTimeStamp);
    socket.emit("player-pause", { roomId, currentTime: serverTimeStamp });
  };
  const onPlay = () => {
    if (player) {
      socket.emit("player-play", { roomId });
      setIsPlaying(true);
    }
  };
  const onPause = () => {
    setIsPlaying(false);
    if (player) {
      socket.emit("player-pause", {
        roomId,
        membersCurrentTime: player.getCurrentTime(),
      });
    }
  };
  const onSeek = (seek: number) => {
    socket.emit("player-seek", { roomId, currentTime: seek });
  };
  const onPlaybackRateChange = (playbackRate: number) => {
    socket.emit("player-playback-rate", { roomId, playbackRate });
  };

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
              muted={false}
              pip={true}
              stopOnUnmount={false}
              onReady={onReady}
              onStart={() => setIsStarted(true)}
              onPlay={onPlay}
              onPause={onPause}
              onSeek={onSeek}
              onPlaybackRateChange={onPlaybackRateChange}
            />
          </div>
      </div>
    </>
  );
}

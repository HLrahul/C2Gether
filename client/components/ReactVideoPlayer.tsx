"use client";

import "@/styles/video-player.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import dynamic from "next/dynamic";
import VideoDetails from "./VideoDetails";

import { socket } from "@/lib/socket";
import { Skeleton } from "@nextui-org/react";
import { useChatStore } from "@/store/chatStore";
import { useVideoUrlStore } from "@/store/videoUrlStore";
import { useAdminStore, useUserStore } from "@/store/userStore";
import { ArrowUpToLine } from "lucide-react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function ReactVideoPlayer() {
  const { roomId } = useParams();
  const { user } = useUserStore();
  const { videoUrl } = useVideoUrlStore();
  const addMessage = useChatStore((state) => state.addMessage);
  const setIsAdmin = useAdminStore((state) => state.setIsAdmin);
  const setVideoUrl = useVideoUrlStore((state) => state.setVideoUrl);

  const [player, setPlayer] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [expectedTime, setExpectedTime] = useState<number>(0);
  const [playedSeconds, setPlayedSeconds] = useState<number>(0);

  const [playFromServer, setPlayFromServer] = useState<boolean>(false);
  const [seekFromServer, setSeekFromServer] = useState<boolean>(false);
  const [pauseFromServer, setPauseFromServer] = useState<boolean>(false);

  useEffect(() => {
    if (videoUrl !== "") {
      setIsLoaded(true);
    }
  }, [videoUrl]);

  useEffect(() => {
    if (player) {
      socket.emit("video-change", { roomId, serverUrl: videoUrl });
    }
  }, [player, roomId, videoUrl]);

  useEffect(() => {
    socket.emit("client-ready", roomId);
    socket.emit("is-admin", { roomId, userId: user?.id });
    socket.on("admin-user", setIsAdmin);
    socket.on("get-player-state", () => {
      if (player) {
        const currentTime = player.getCurrentTime();
        socket.emit("send-player-state", {
          roomId,
          currentTime,
          serverUrl: videoUrl,
        });
      }
    });
    socket.on("player-state-from-server", ({ serverUrl, currentTime }) => {
      if (videoUrl !== serverUrl) {
        setVideoUrl(serverUrl);
      }
      if (player && currentTime) {
        player.seekTo(currentTime);
      }
    });
    socket.on("video-change-from-server", ({ serverUrl }) => {
      if (player && serverUrl !== "" && videoUrl !== serverUrl) {
        setVideoUrl(serverUrl);
        player.seekTo(0);
      }
    });
    socket.on("player-play-from-server", () => {
      if (player) {
        setPlayFromServer(true);
        setIsPlaying(true);
      }
    });
    socket.on("player-pause-from-server", (membersCurrentTime) => {
      if (player && isPlaying) {
        setPauseFromServer(true);
        setSeekFromServer(true);
        player.seekTo(membersCurrentTime);
        setExpectedTime(membersCurrentTime);
        setIsPlaying(false);
      }
    });
    socket.on("player-seek-from-server", (currentTime: number) => {
      if (player) {
        setSeekFromServer(true);
        setExpectedTime(currentTime);
        player.seekTo(currentTime);
      }
    });
    socket.on("playback-rate-change-from-server", (playbackRate) => {
      if (player) {
        setPlaybackRate(playbackRate);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, player, user, setIsAdmin, isPlaying, setVideoUrl, videoUrl]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (player && isPlaying) {
      setExpectedTime(playedSeconds);
      interval = setInterval(() => {
        setExpectedTime((prevTime) => prevTime + 1 * playbackRate);
      }, 1000);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, isPlaying, playbackRate]);

  useEffect(() => {
    if (player && isPlaying) {
      const timeDiff = Math.ceil(Math.abs(playedSeconds - expectedTime));
      if (timeDiff > 2) {
        socket.emit("player-pause", {
          roomId,
          membersCurrentTime: playedSeconds,
        });
        setExpectedTime(playedSeconds);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, playedSeconds, isPlaying, expectedTime]);

  function SendActionMessage(action: string) {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    user &&
      addMessage({
        name: `${user.username} (You)`,
        message: action,
        timeSent: time,
        isAction: true,
      });
    user &&
      socket.emit("action-message", {
        roomId: roomId,
        name: user.username,
        message: action,
        timeSent: new Date().toISOString(),
      });
  }

  const onReady = (player: any) => {
    setPlayer(player);
  };
  const onPlay = () => {
    if (player && !isPlaying) {
      socket.emit("player-play", { roomId });
      console.log("player-play");
      SendActionMessage("started playing.");
      if (!isPlaying) setIsPlaying(true);
    }
  };
  const onPause = () => {
    if (player && isPlaying) {
      socket.emit("player-pause", {
        roomId,
        membersCurrentTime: player.getCurrentTime(),
      });
      console.log("player-pause");
      SendActionMessage("paused the video.");
    }
    setIsPlaying(false);
  };
  const onSeek = (seek: number) => {
    socket.emit("player-seek", { roomId, seek });
  };
  const onPlaybackRateChange = (playbackRate: number) => {
    socket.emit("playback-rate-change", { roomId, playbackRate });
    SendActionMessage(`changed playbackrate to ${playbackRate}`);
  };
  const onEnded = () => {
    if (player) {
      setExpectedTime(0);
      player.seekTo(0);
      setTimeout(() => {
        setIsPlaying(true);
      }, 1000);
    }
  };

  return (
    <div className="col-span-8 md:col-span-5">
      <Skeleton isLoaded className="w-5/5 rounded-lg mb-5">
        {!isLoaded && (
          <div className="absolute h-full w-full bg-foreground-800 flex flex-col items-center justify-start">
            <ArrowUpToLine className="" />
            <p className="w-[70%] h-[90%] flex items-center justify-center text-center">
              Paste a youtube video link or start typing to search a video from
              youtube.
            </p>
          </div>
        )}
        <div className="video-responsive">
          <ReactPlayer
            key={videoUrl}
            url={videoUrl}
            className="react-player"
            height="100%"
            width="100%"
            controls={true}
            playing={isPlaying}
            muted={false}
            pip={true}
            stopOnUnmount={false}
            onReady={onReady}
            onPlay={onPlay}
            onPause={onPause}
            onSeek={onSeek}
            onProgress={({ playedSeconds }) => {
              setPlayedSeconds(playedSeconds);
            }}
            playbackRate={playbackRate}
            onPlaybackRateChange={onPlaybackRateChange}
            onEnded={onEnded}
          />
        </div>
      </Skeleton>

      <VideoDetails isVideoSet={isLoaded} />
    </div>
  );
}

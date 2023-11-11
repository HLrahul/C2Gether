"use client";

import { useRef, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

import { useVideoIdStore } from "@/store/videoIdStore";

export default function VideoPlayer() {
  const { videoId } = useVideoIdStore();
  const playerRef = useRef<any>(null);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    event.target.pauseVideo();
  };

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.stopVideo();
      }
    };
  }, []);

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
  };

  return (
    <div className="row-span-4 col-span-5">
      <div className="aspect-w-16 aspect-h-9">
        <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
      </div>
    </div>
  );
}

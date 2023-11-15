"use client"

import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useVideoIdStore } from "@/store/videoIdStore";

export default function VideoLinkInput() {
  const { setVideoId } = useVideoIdStore();
  const [inputValue, setInputValue] = useState("");

  const getVideoIdFromUrl = (url: string) => {
    if (url.length === 11) return url; // Already a valid videoId

    const regex =
      /(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const matches = url.match(regex);
    if (matches && matches[2].length === 11) {
      return matches[2];
    }
    return url;
  };

  return (
    <div className="flex gap-2">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Paste the link of the Video"
      />
      <Button
        color="primary"
        variant="ghost"
        onClick={() => {
          const videoId = getVideoIdFromUrl(inputValue);
          if (videoId) {
            setVideoId(videoId);
          }
        }}
      >
        Go
      </Button>
    </div>
  );
}

"use client";

import '@/styles/video-player.css';

import { useVideoIdStore } from "@/store/videoIdStore";

export default function VideoPlayer () {

    const { videoId } = useVideoIdStore();

    return (
      <div className="col-span-8 row-span-2 md:col-span-5">
        <div className="video-responsive">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
}
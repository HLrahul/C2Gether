import { useEffect, useState } from "react";
import VideoDetailsFetcher from "./VideoDetailsFetcher";
import { useVideoUrlStore } from "@/store/videoUrlStore";
import VideoDetailsRenderer from "./VideoDetailsRenderer";
import { ChannelDetailsType, PlaylistVideo, VideoDetailsType } from "@/types";

export default function VideoDetails() {
  const { videoUrl } = useVideoUrlStore();
  const [videoDetails, setVideoDetails] = useState<VideoDetailsType | null>(null);
  const [channelDetails, setChannelDetails] = useState<ChannelDetailsType | null>(
    null
  );
  const [playlistVideos, setPlaylistVideos] = useState<PlaylistVideo[]>([]);

  useEffect(() => {
    const isPlaylist =
      typeof videoUrl === "string" && videoUrl.includes("playlist");
    
    let videoId;
    if (typeof videoUrl === "string") {
      if (isPlaylist) videoId = videoUrl.split("list=")[1];
      else videoId = videoUrl.split("v=")[1];
    }

    if (videoId) {
      VideoDetailsFetcher({
        videoId,
        isPlaylist,
        setVideoDetails,
        setChannelDetails,
        setPlaylistVideos
    });
    }
  }, [videoUrl]);

  return (
    <div className="col-span-8 md:col-span-5 mt-5">
        <VideoDetailsRenderer
          videoDetails={videoDetails}
          channelDetails={channelDetails}
          playlistVideos={playlistVideos}
        />
    </div>
  );
}

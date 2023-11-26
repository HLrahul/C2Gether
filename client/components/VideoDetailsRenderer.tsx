import { useState } from "react";
import PlaylistVideos from "./PlaylistVideos";
import { useVideoUrlStore } from "@/store/videoUrlStore";
import ChannelDetails from "@/components/ChannelDetails";
import VideoDetailsContent from "@/components/VideoDetailsContent";
import { ChannelDetailsType, PlaylistVideo, VideoDetailsType } from "@/types";

interface VideoDetailsRendererProps {
  isVideoSet: boolean;
  videoDetails: VideoDetailsType | null;
  channelDetails: ChannelDetailsType | null;
  playlistVideos: PlaylistVideo[];
}

export default function VideoDetailsRenderer({
  isVideoSet,
  videoDetails,
  channelDetails,
  playlistVideos,
}: VideoDetailsRendererProps) {
  const { videoUrl } = useVideoUrlStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const isPlaylist =
    typeof videoUrl === "string" && videoUrl.includes("playlist");

  return (
    <div>
      {videoDetails && (
        <VideoDetailsContent
          videoDetails={videoDetails}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      )}

      {isPlaylist && (
        <PlaylistVideos
          videos={playlistVideos.length}
          playlistVideos={playlistVideos}
        />
      )}

      {channelDetails && <ChannelDetails channelDetails={channelDetails} />}
    </div>
  );
}

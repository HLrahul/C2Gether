import { useState } from "react";
import PlaylistVideos from "./PlaylistVideos";
import { useVideoIdStore } from "@/store/videoIdStore";
import ChannelDetails from "@/components/ChannelDetails";
import VideoDetailsContent from "@/components/VideoDetailsContent";
import { ChannelDetailsType, PlaylistVideo, VideoDetailsType } from "@/types";

interface VideoDetailsRendererProps {
    videoDetails: VideoDetailsType | null;
    channelDetails: ChannelDetailsType | null;
    playlistVideos: PlaylistVideo[];
}

export default function VideoDetailsRenderer({
  videoDetails,
  channelDetails,
  playlistVideos,
}: VideoDetailsRendererProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      {videoDetails && (
        <VideoDetailsContent
          videoDetails={videoDetails}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      )}

      {useVideoIdStore().isPlaylist && (
        <PlaylistVideos
        videos={playlistVideos.length}
          playlistVideos={playlistVideos}
        />
        )}

      {channelDetails && <ChannelDetails channelDetails={channelDetails} />}
    </div>
  );
}

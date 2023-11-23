import { useEffect, useState } from "react";
import { useVideoIdStore } from "@/store/videoIdStore";
import VideoDetailsFetcher from "./VideoDetailsFetcher";
import VideoDetailsRenderer from "./VideoDetailsRenderer";
import { ChannelDetailsType, PlaylistVideo, VideoDetailsType } from "@/types";

export default function VideoDetails() {
  const { videoId, isPlaylist } = useVideoIdStore();
  const [videoDetails, setVideoDetails] = useState<VideoDetailsType | null>(null);
  const [channelDetails, setChannelDetails] = useState<ChannelDetailsType | null>(
    null
  );
  const [playlistVideos, setPlaylistVideos] = useState<PlaylistVideo[]>([]);;

  useEffect(() => {
    if (videoId) {
      VideoDetailsFetcher({
        videoId,
        isPlaylist,
        setVideoDetails,
        setChannelDetails,
        setPlaylistVideos
    });
    }
  }, [isPlaylist, videoId]);

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

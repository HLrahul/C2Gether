import axios from "axios";
import { ChannelDetailsType, PlaylistVideo, VideoDetailsType } from "@/types";

interface VideoDetailsFetcherProps {
  videoId: string;
  isPlaylist: boolean;
  setVideoDetails: (value: VideoDetailsType | null) => void;
  setChannelDetails: (value: ChannelDetailsType | null) => void;
  setPlaylistVideos: (value: PlaylistVideo[]) => void;
}

export default function VideoDetailsFetcher({
  videoId,
  isPlaylist,
  setVideoDetails,
  setChannelDetails,
  setPlaylistVideos,
}: VideoDetailsFetcherProps) {
  const fetchVideoDetails = async () => {
    let response;

    if (isPlaylist) {
      response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlists?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet`
      );

      const playlistItemsResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );
      setPlaylistVideos(playlistItemsResponse?.data?.items);
    } else {
      response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet`
      );
    }

    const videoDetails = response?.data?.items[0]?.snippet;
    setVideoDetails(videoDetails);

    if (videoDetails?.channelId) {
      const channelResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?id=${videoDetails.channelId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet`
      );

      setChannelDetails(channelResponse?.data?.items[0]?.snippet);
    }
  };

  fetchVideoDetails();
}

"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar, Skeleton } from "@nextui-org/react";
import { useVideoIdStore } from "@/store/videoIdStore";

interface VideoDetails {
  title: string;
  description: string;
  channelId: string;
  thumbnails: {
    default: {
      url: string;
    };
  };
  channelTitle: string;
}

interface ChannelDetails {
  thumbnails: {
    default: {
      url: string;
    };
  };
}

interface VideoDetailsContentProps {
  videoDetails: VideoDetails | null;
  channelDetails: ChannelDetails | null;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export default function VideoDetails() {
  const { videoId } = useVideoIdStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [channelDetails, setChannelDetails] = useState<ChannelDetails | null>(
    null
  );

  useEffect(() => {
    if (videoId) {
      const fetchVideoDetails = async () => {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet`
        );
        setVideoDetails(response.data.items[0].snippet);
        setIsLoading(false);
      };

      fetchVideoDetails();
    }
  }, [videoId]);

  useEffect(() => {
    if (videoDetails?.channelId) {
      const fetchChannelDetails = async () => {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?id=${videoDetails.channelId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet`
        );
        setChannelDetails(response.data.items[0].snippet);
      };

      fetchChannelDetails();
    }
  }, [videoDetails]);

  return (
    <div className="row-span-2 col-span-8 md:col-span-5">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <VideoDetailsContent
          videoDetails={videoDetails}
          channelDetails={channelDetails}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      )}
    </div>
  );
}

const SkeletonLoader = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="w-4/5 rounded-lg h-3" />
    <Skeleton className="w-3/5 rounded-lg h-3" />
    <div className="max-w-[300px] w-full flex items-center gap-3">
      <Skeleton className="flex rounded-full w-14 h-11" />
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="rounded-lg h-3 w-1/2" />
        <Skeleton className="rounded-lg h-3 w-full" />
      </div>
    </div>
  </div>
);

const VideoDetailsContent: React.FC<VideoDetailsContentProps> = ({
  videoDetails,
  channelDetails,
  isExpanded,
  setIsExpanded,
}) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-2">
      <p className="font-bold">{videoDetails?.title}</p>
      <p
        className={`text-default-400 text-sm transition-all duration-500 ease-in-out transform overflow-hidden ${
          isExpanded ? "max-h-full" : "max-h-[3em]"
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {videoDetails?.description}
      </p>
    </div>
    <div className="flex gap-4 items-center">
      <Avatar
        isBordered
        color="primary"
        size="md"
        src={channelDetails?.thumbnails.default.url}
      />
      <p className="text-small text-foreground/80 font-extrabold">
        {videoDetails?.channelTitle}
      </p>
    </div>
  </div>
);

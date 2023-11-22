"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Card,
  CardBody,
  Image,
  Skeleton,
} from "@nextui-org/react";
import { useVideoIdStore } from "@/store/videoIdStore";
import { VideoIcon } from "lucide-react";

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

interface PlaylistVideo {
  snippet: {
    resourceId: {
      videoId: string;
    };
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

interface PlaylistVideosCardProps {
  video: PlaylistVideo;
}

interface VideoDetailsContentProps {
  videoDetails: VideoDetails | null;
  channelDetails: ChannelDetails | null;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  videos: number;
  playlistVideos: PlaylistVideo[];
}

export default function VideoDetails() {
  const { videoId, isPlaylist } = useVideoIdStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [channelDetails, setChannelDetails] = useState<ChannelDetails | null>(
    null
  );
  const [playlistVideos, setPlaylistVideos] = useState([]);

  useEffect(() => {
    if (videoId) {
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

        setVideoDetails(response?.data?.items[0]?.snippet);
        setIsLoading(false);
      };

      fetchVideoDetails();
    }
  }, [isPlaylist, videoId]);

  useEffect(() => {
    if (videoDetails?.channelId) {
      const fetchChannelDetails = async () => {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?id=${videoDetails.channelId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet`
        );
        setChannelDetails(response?.data?.items[0]?.snippet);
      };

      fetchChannelDetails();
    }
  }, [videoDetails]);

  return (
    <div className="col-span-8 md:col-span-5 mt-5">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <VideoDetailsContent
          videoDetails={videoDetails}
          channelDetails={channelDetails}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          videos={playlistVideos.length}
          playlistVideos={playlistVideos}
        />
      )}
    </div>
  );
}

const SkeletonLoader = () => (
  <div className="flex flex-col gap-2">
    <Skeleton isLoaded className="w-4/5 rounded-lg h-3" />
    <Skeleton isLoaded className="w-3/5 rounded-lg h-3" />
    <div className="max-w-[300px] w-full flex items-center gap-3">
      <Skeleton isLoaded className="flex rounded-full w-14 h-11" />
      <div className="w-full flex flex-col gap-2">
        <Skeleton isLoaded className="rounded-lg h-3 w-1/2" />
        <Skeleton isLoaded className="rounded-lg h-3 w-full" />
      </div>
    </div>
  </div>
);

const VideoDetailsContent: React.FC<VideoDetailsContentProps> = ({
  videoDetails,
  channelDetails,
  isExpanded,
  setIsExpanded,
  videos,
  playlistVideos,
}) => {
  const { isPlaylist } = useVideoIdStore();

  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-10 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-bold">{videoDetails?.title}</p>
        {videoDetails?.description && (
          <p
            className={`text-default-400 text-sm transition-all duration-500 ease-in-out transform overflow-hidden ${
              isExpanded ? "max-h-full" : "max-h-[3em]"
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {videoDetails?.description}
          </p>
        )}
      </div>

      {isPlaylist && (
        <Accordion
          isCompact
          showDivider={false}
          className="p-2 flex flex-col gap-1 w-full"
          variant="shadow"
          itemClasses={itemClasses}
        >
          <AccordionItem
            key="1"
            aria-label="playlist"
            startContent={<VideoIcon className="text-primary" />}
            subtitle={
              <p className="flex">
                <p className="text-primary">{`${videos} videos`}</p>
              </p>
            }
            title="Playlist"
          >
            <div className="overflow-y-auto max-h-64">
              {playlistVideos?.map((video) => {
                return (
                  <PlaylistVideosCard
                    key={video?.snippet?.resourceId?.videoId}
                    video={video}
                  />
                );
              })}
            </div>
          </AccordionItem>
        </Accordion>
      )}

      <div className="flex gap-4 items-center mt-2">
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
};

const PlaylistVideosCard: React.FC<PlaylistVideosCardProps> = ({ video }) => {
  return (
    <Card isBlurred className="border-none w-full hover:bg-primary mt-3">
      <CardBody>
        <div className="flex w-full">
          <div className="w-12">
            <Image
              alt={video.snippet.title || "Video"}
              className="z-1 object-cover w-full h-full"
              shadow="md"
              src={video.snippet.thumbnails.medium.url}
            />
          </div>
          <div className="ml-2">
            <h3 className="font-semibold text-foreground/90">
              {video.snippet.title}
            </h3>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

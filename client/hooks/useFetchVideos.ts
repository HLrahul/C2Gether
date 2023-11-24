"use client";

import axios from "axios";
import { Video } from "@/types";
import { useEffect } from "react";
import { useVideoStore } from "@/store/videosStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchVideos = (
  searchKeyword: string,
  isSearchOperation: boolean
) => {
  const { setFetchedVideos, appendFetchedVideos } = useVideoStore();

  // Function to fetch videos and playlists
  const fetchVideosandPlaylists = async (pageToken: string) => {
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&pageToken=${pageToken}&q=${searchKeyword}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    );
    const videoIds = data.items.map((item: any) => item.id.videoId).join(",");
    const channelIds = data.items
      .map((item: any) => item.snippet.channelId)
      .join(",");

    const [videoResponse, channelResponse] = await Promise.all([
      axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      ),
      axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      ),
    ]);

    const videosWithDetailsAndLogo = data.items.map((item: any) => {
      if (item.id.videoId) {
        const video = videoResponse.data.items.find(
          (video: any) => video.id === item.id.videoId
        );
        const channel = channelResponse.data.items.find(
          (channel: any) => channel.id === item.snippet.channelId
        );

        return {
          ...item,
          duration: video.contentDetails.duration,
          channelLogo: channel.snippet.thumbnails.default.url,
        };
      } else if (item.id.playlistId) {
        const channel = channelResponse.data.items.find(
          (channel: any) => channel.id === item.snippet.channelId
        );

        return {
          ...item,
          channelLogo: channel.snippet.thumbnails.default.url,
        };
      }   
    });

    return { ...data, items: videosWithDetailsAndLogo };
  };

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: ({ pageParam = "" }) => fetchVideosandPlaylists(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    initialPageParam: "",
    enabled: false,
    retry: 0,
  });

  // Update the fetched videos when data changes
  useEffect(() => {
    if (data) {
      const lastPage = data.pages[data.pages.length - 1];
      const videos = lastPage.items
        .filter((item: Video | undefined): item is Video => item !== undefined)
        .map((item: Video) => {
          return {
            kind: item.kind,
            etag: item.etag,
            id: item.id,
            snippet: {
              publishedAt: item.snippet.publishedAt,
              channelId: item.snippet.channelId,
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnails: item.snippet.thumbnails,
              channelTitle: item.snippet.channelTitle,
              liveBroadcastContent: item.snippet.liveBroadcastContent,
              publishTime: item.snippet.publishTime,
            },
            duration: item.duration || "",
            channelLogo: item.channelLogo,
          };
        });
      if (isSearchOperation) setFetchedVideos(videos);
      else appendFetchedVideos(videos);
    }
  }, [data, setFetchedVideos, appendFetchedVideos, isSearchOperation]);

  return {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  };
};

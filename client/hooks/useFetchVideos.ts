"use client";

import { useEffect, useRef } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { useVideoStore } from "@/store/videosStore";

import { Item } from "@/types";

export const useFetchVideos = (searchKeyword: string) => {
  const { fetchedVideos, setFetchedVideos } = useVideoStore();
  const fetchedVideosRef = useRef(fetchedVideos);

  const fetchVideosandPlaylists = async (pageToken: string) => {
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&pageToken=${pageToken}&q=${searchKeyword}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    );
    return data;
  };

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["videos", searchKeyword],
    queryFn: ({ pageParam = "" }) => fetchVideosandPlaylists(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    initialPageParam: "",
    enabled: false,
    retry: 0,
  });

  useEffect(() => {
    if (data) {
      const videos = data.pages.flatMap((page) =>
        page.items.map((item: Item) => {
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
          };
        })
      );

      // Append new videos to the existing ones
      fetchedVideosRef.current = [
        ...(fetchedVideosRef.current || []),
        ...videos,
      ];
      setFetchedVideos(fetchedVideosRef.current);
    }
  }, [data, setFetchedVideos]);

  return {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
};

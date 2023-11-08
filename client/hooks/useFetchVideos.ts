import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchVideos = (searchKeyword: string) => {

  const fetchVideosandPlaylists = async (pageToken: string) => {
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&pageToken=${pageToken}&q=${searchKeyword}&key=${process.env.YOUTUBE_API_KEY}`
    );
    return data;
  }

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery ({
    queryKey: ["videos", searchKeyword],
    queryFn: ({ pageParam = "" }) => fetchVideosandPlaylists(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    initialPageParam: "",
  });

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

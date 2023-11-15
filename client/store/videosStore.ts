import { Video } from "@/types";
import { create } from "zustand";

type VideoStore = {
  fetchedVideos: Video[];
  setFetchedVideos: (videos: Video[]) => void;
  appendFetchedVideos: (videos: Video[]) => void;
};

export const useVideoStore = create<VideoStore>((set) => ({
  fetchedVideos: [],
  setFetchedVideos: (videos) => set({ fetchedVideos: videos }),
  appendFetchedVideos: (videos) =>
    set((state) => ({
      fetchedVideos: [
        ...state.fetchedVideos,
        ...videos.filter(
          (video) =>
            !state.fetchedVideos.some((v) => v.id.videoId === video.id.videoId)
        ),
      ],
    })),
}));

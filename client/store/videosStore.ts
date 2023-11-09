import { create } from "zustand";
import { Video } from "@/types";

type VideoStore = {
  fetchedVideos: Video[] | undefined;
  setFetchedVideos: (videos: Video[] | undefined) => void;
};

export const useVideoStore = create<VideoStore>((set) => ({
  fetchedVideos: undefined,
  setFetchedVideos: (videos) => set({ fetchedVideos: videos }),
}));

import { create } from "zustand";

type VideoIdStore = {
  videoId: string;
  setVideoId: (videoId: string) => void;
  isPlaylist: boolean;
  setIsPlaylist: (isPlaylist: boolean) => void;
};

export const useVideoIdStore = create<VideoIdStore>((set) => ({
  videoId: "",
  setVideoId: (videoId) => set({ videoId }),
  isPlaylist: false,
  setIsPlaylist: (isPlaylist) => set({ isPlaylist }),
}));

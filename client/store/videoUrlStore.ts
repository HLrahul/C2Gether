import { create } from "zustand";

type VideoUrlStore = {
  videoUrl: string;
  setVideoUrl: (videoUrl: string) => void;
};

export const useVideoUrlStore = create<VideoUrlStore>((set) => ({
  videoUrl: "",
  setVideoUrl: (videoUrl) => set({ videoUrl }),
}));
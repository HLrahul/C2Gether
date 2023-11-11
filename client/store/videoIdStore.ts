import { create } from 'zustand';

type VideoIdStore = {
  videoId: string;
  setVideoId: (videoId: string) => void;
};

export const useVideoIdStore = create<VideoIdStore>((set) => ({
  videoId: '',
  setVideoId: (videoId) => set({ videoId }),
}));
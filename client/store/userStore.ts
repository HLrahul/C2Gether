import { create } from "zustand";

export interface User {
  id: string;
  username: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

interface PromptState {
  showPrompt: boolean;
  setShowPrompt: (showPrompt: boolean) => void;
}

interface AdminState {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
export const usePromptStore = create<PromptState>((set) => ({
  showPrompt: false,
  setShowPrompt: (showPrompt) => set({ showPrompt }),
}));
export const useAdminStore = create<AdminState>((set) => ({
  isAdmin: false,
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}))



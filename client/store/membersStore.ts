import { create } from "zustand";
import { User } from "./userStore";

interface userState {
  members: User[];
  setMembers: (members: User[]) => void;
}

export const useMembersStore = create<userState>((set) => ({
  members: [],
  setMembers: (members) => set({ members }),
}));

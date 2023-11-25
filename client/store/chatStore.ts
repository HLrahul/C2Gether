import { create } from "zustand";

export interface Message {
    name: string;
    message: string;
    timeSent: string;
}

interface ChatStore {
    messages: Message[];
    addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),
}));
"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { usePromptStore, useUserStore } from "@/store/userStore";

import ChatWindow from "@/components/ChatWindow";
import VideoSearchBar from "@/components/VideoSearchBar";
import DisconnectedNote from "@/components/DisconnectedNote";
import ReactVideoPlayer from "@/components/ReactVideoPlayer";

export default function RoomPage() {
  const router = useRouter();
  const { roomId } = useParams();
  const { user } = useUserStore();
  const { setShowPrompt } = usePromptStore();

  useEffect(() => {
    if (!user) {
      if (roomId.length === 21) setShowPrompt(true);
      else router.replace("/");
    }
  }, [user, roomId, router, setShowPrompt]);

  return (
    <>
      <DisconnectedNote />

      <section className="min-h-full w-full m-auto px-1">
        <div
          className="grid grid-cols-8 lg:w-[75%] gap-5 m-auto p-5"
          style={{ gridAutoRows: "min-content" }}
        >
          <VideoSearchBar />

          <ReactVideoPlayer />
          <ChatWindow />
        </div>
      </section>
    </>
  );
}

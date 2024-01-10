"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { socket } from "@/lib/socket";
import { useChatStore } from "@/store/chatStore";
import { useVideoUrlStore } from "@/store/videoUrlStore";
import { useUserStore, usePromptStore } from "@/store/userStore";

export default function LeaveButton() {
  const router = useRouter();
  const { resetMessage } = useChatStore();
  const { setVideoUrl } = useVideoUrlStore();
  const { setShowPrompt } = usePromptStore();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  return (
    <Button
      variant="solid"
      color="danger"
      className="absolute bottom-0 w-full"
      isLoading={isLoading}
      onClick={() => {
        setIsLoading(true);
        socket.emit("leave-room");
        setTimeout(() => {
          router.replace("/");
          setUser(null);
          resetMessage();
          setVideoUrl("");
          setShowPrompt(false);
        }, 600);
      }}
    >
      Leave Room
    </Button>
  );
}

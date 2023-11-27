"use client";

import { useState } from "react";
import { socket } from "@/lib/socket";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { usePromptStore } from "@/store/userStore";
import { useVideoUrlStore } from "@/store/videoUrlStore";
import { useChatStore } from "@/store/chatStore";

export default function LeaveButton() {
  const router = useRouter();
  const { resetMessage } = useChatStore();
  const { setVideoUrl } = useVideoUrlStore();
  const { setShowPrompt } = usePromptStore();
  const [isLoading, setIsLoading] = useState(false);


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
          setShowPrompt(false);
          resetMessage();
          setVideoUrl("");
        }, 600);
      }}
    >
      Leave Room
    </Button>
  );
}

"use client";

import { useState } from "react";
import { socket } from "@/lib/socket";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { usePromptStore } from "@/store/userStore";

export default function LeaveButton() {
  const router = useRouter();
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
        }, 600);
      }}
    >
      Leave Room
    </Button>
  );
}

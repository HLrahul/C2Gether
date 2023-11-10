"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@nextui-org/react";
import { socket } from "@/lib/socket";
 
 export default function LeaveButton () {
    const router = useRouter();

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
          }, 600);
        }}
      >
        Leave Room
      </Button>
    );
 }
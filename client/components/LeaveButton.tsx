import { useState } from "react";
import router from "next/router";

import { Button } from "@nextui-org/react";
import { socket } from "@/lib/socket";
 
 export default function LeaveButton () {

    const [isLoading, setIsLoading] = useState(false);

    return (
      <Button
        variant="ghost"
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
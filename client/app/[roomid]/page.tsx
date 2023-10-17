"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import BottomBar from "@/components/BottomBar"
import { useUserStore } from "@/store/userStore"
import JoinRoomPrompt from "@/components/JoinRoomPrompt"
import DisconnectedDialog from "@/components/Disconnected"

export default function RoomPage () {
    const user = useUserStore(state => state.user)

    const router = useRouter()

    const roomId = window.location.pathname.substring(1) 
    const [showDialog, setShowDialog] = useState(false)

    useEffect(() => {
        if(!user) {
          if (roomId.length === 21) {
            setShowDialog(true);
          } else {
            router.replace("/");
          }
        }
    }, []);

    return (
      <div>
        <DisconnectedDialog />
        
        <JoinRoomPrompt roomId={roomId} showDialog={showDialog} setShowDialog={setShowDialog} />
        
        <BottomBar />
      </div>
    );
} 
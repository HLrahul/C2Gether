"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useUserStore, useJoinPrompt } from "@/store/userStore"

import BottomBar from "@/components/BottomBar"
import JoinRoomPrompt from "@/components/JoinRoomPrompt"
import DisconnectedDialog from "@/components/Disconnected"

export default function RoomPage () {
    const user = useUserStore(state => state.user)
    const setShowDialog = useJoinPrompt(state => state.setShowDialog)
    
    const router = useRouter()
    const { roomId } = useParams()

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
        
        <JoinRoomPrompt roomId={roomId && (typeof roomId === "string" ? roomId : roomId[0])} />
        
        <BottomBar />
      </div>
    );
} 
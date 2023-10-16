"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import BottomBar from "@/components/BottomBar"
import { useUserStore } from "@/store/userStore"
import JoinRoomPrompt from "@/components/JoinRoomPrompt"
import DisconnectedDialog from "@/components/Disconnected"

export default function RoomPage () {
    const router = useRouter()
    const [showDialog, setShowDialog] = useState(false)
    const [roomId, setRoomId] = useState<string>("")

    const user = useUserStore(state => state.user)
    
    
    useEffect(() => {
        if(!user) {
          setRoomId(window.location.pathname.split("/")[1])
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

            <JoinRoomPrompt roomId={roomId} showDialog={showDialog} />

            <BottomBar />
        </div>
    )
} 
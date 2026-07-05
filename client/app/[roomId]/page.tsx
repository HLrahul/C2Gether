'use client';

import { usePromptStore, useUserStore } from '@/store/userStore';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import DisconnectedNote from '@/components/DisconnectedNote';
import JoinRoomPrompt from '@/components/JoinRoomPrompt';
import RoomSidebar from '@/components/RoomSidebar';
import VideoPlayer from '@/components/VideoPlayer';
import VideoSearchBar from '@/components/VideoSearchBar';

// import ReactVideoPlayer from "@/components/ReactVideoPlayer";

export default function RoomPage() {
  const router = useRouter();
  const { roomId } = useParams();
  const { user } = useUserStore();
  const { setShowPrompt } = usePromptStore();

  useEffect(() => {
    if (!user) {
      if (roomId.length === 21) setShowPrompt(true);
      else router.replace('/');
    }
  }, [user, roomId, router, setShowPrompt]);

  return (
    <>
      <JoinRoomPrompt
        roomId={roomId && (typeof roomId === 'string' ? roomId : roomId[0])}
      />
      <DisconnectedNote />

      <section className="h-[calc(100vh-64px)] w-full m-auto overflow-hidden pt-4 pb-4">
        <div className="grid grid-cols-8 h-full w-full max-w-[1800px] gap-6 px-6 m-auto">
          {/* Left Column: Video Player */}
          <div className="col-span-8 md:col-span-6 flex flex-col relative h-full">
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[80%] max-w-xl z-10 transition-all hover:scale-105">
              <VideoSearchBar />
            </div>

            <div className="flex-grow rounded-2xl overflow-hidden shadow-[0_0_50px_-15px_rgba(20,184,166,0.4)] border border-white/10 bg-black/40 backdrop-blur-xl relative flex items-center justify-center">
              <VideoPlayer />
            </div>
          </div>

          {/* Right Column: Sidebar (Chat/Members) */}
          <RoomSidebar />
        </div>
      </section>
    </>
  );
}

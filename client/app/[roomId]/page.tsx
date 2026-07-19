'use client';

import { usePromptStore, useUserStore } from '@/store/userStore';
import { Maximize, MessageSquare, Minimize, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@nextui-org/react';

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
  const [isChatOpen, setIsChatOpen] = useState(true);

  useEffect(() => {
    if (!user) {
      if (roomId.length === 21) setShowPrompt(true);
      else router.replace('/');
    }
  }, [user, roomId, router, setShowPrompt]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current
        ?.requestFullscreen()
        .catch((err) => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <>
      <JoinRoomPrompt
        roomId={roomId && (typeof roomId === 'string' ? roomId : roomId[0])}
      />
      <DisconnectedNote />

      <section className="h-[calc(100vh-64px)] w-full m-auto overflow-hidden pt-4 pb-4">
        <div
          ref={containerRef}
          className={`flex h-full w-full max-w-[1800px] gap-6 px-6 m-auto relative transition-colors duration-500 ${isFullscreen ? 'bg-background p-6 max-w-full' : ''}`}
        >
          {/* Left Column: Video Player */}
          <div
            className={`flex-grow flex flex-col relative h-full transition-all duration-300 ${isChatOpen ? 'w-full lg:w-[75%]' : 'w-full'}`}
          >
            <div className="flex justify-between items-center mb-4 gap-4">
              <div className="flex-grow max-w-xl">
                <VideoSearchBar />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  color="primary"
                  variant="flat"
                  onClick={toggleFullscreen}
                  className="backdrop-blur-md bg-white/50 dark:bg-black/40 border border-black/10 dark:border-white/10 text-gray-900 dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  {isFullscreen ? (
                    <Minimize size={20} />
                  ) : (
                    <Maximize size={20} />
                  )}
                </Button>
                <Button
                  isIconOnly
                  color="primary"
                  variant="flat"
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="backdrop-blur-md bg-white/50 dark:bg-black/40 border border-black/10 dark:border-white/10 text-gray-900 dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  {isChatOpen ? <X size={20} /> : <MessageSquare size={20} />}
                </Button>
              </div>
            </div>

            <div className="flex-grow rounded-2xl overflow-hidden shadow-[0_0_50px_-15px_rgba(20,184,166,0.4)] border border-white/10 bg-black/40 backdrop-blur-xl relative flex items-center justify-center">
              <VideoPlayer />
            </div>
          </div>

          {/* Right Column: Sidebar (Chat/Members) */}
          <div
            className={`transition-all duration-300 h-full ${isChatOpen ? 'w-full lg:w-[25%] opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-full overflow-hidden'}`}
          >
            <RoomSidebar />
          </div>
        </div>
      </section>
    </>
  );
}

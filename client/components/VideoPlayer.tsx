"use client";

import { Skeleton } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import '@/styles/video-player.css';

import { socket } from '@/lib/socket';
import { useVideoIdStore } from "@/store/videoIdStore";
import { useUserStore, usePromptStore } from '@/store/userStore';

import JoinRoomPrompt from './JoinRoomPrompt';

export default function VideoPlayer () {
    const { user } = useUserStore();
    const { videoId } = useVideoIdStore();
    const { setShowPrompt } = usePromptStore(); 

    const [isLoading, setIsLoading] = useState(true);

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const router = useRouter();
    const { roomId } = useParams();

    useEffect(() => {
      if(!user) {
        if(roomId.length === 21) setShowPrompt(true);
        else router.replace('/');
      }
    }, [user, roomId, router, setShowPrompt])

    useEffect(() => {
      const iframe = iframeRef.current;

      if (iframe) {
        socket.emit('client-ready', roomId);

        socket.on('client-loaded', () => {
          console.log("Received client-loaded event");
          setIsLoading(false);
        })
      }
    }, [roomId]);

    return (
      <>
        <JoinRoomPrompt />

        <div className="col-span-8 row-span-2 md:col-span-5">
          {isLoading ? (
            <Skeleton isLoaded={isLoading} className="h-[40vh] bg-default-200 rounded-lg">
              <div className="h-[40vh] bg-default-200"></div>
            </Skeleton>
          ) : (
            <div className="video-responsive">
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </>
    );
}
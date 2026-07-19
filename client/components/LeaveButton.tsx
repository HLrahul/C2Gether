'use client';

import { socket } from '@/lib/socket';
import { useChatStore } from '@/store/chatStore';
import { usePromptStore, useUserStore } from '@/store/userStore';
import { useVideoUrlStore } from '@/store/videoUrlStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@nextui-org/react';

export default function LeaveButton() {
  const router = useRouter();
  const { resetMessage } = useChatStore();
  const { setVideoUrl } = useVideoUrlStore();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const setShowPrompt = usePromptStore((state) => state.setShowPrompt);

  return (
    <Button
      variant="light"
      color="danger"
      className="w-full rounded-none h-14 bg-transparent hover:bg-danger/20 transition-colors font-medium text-danger"
      isLoading={isLoading}
      onClick={() => {
        setIsLoading(true);
        socket.emit('leave-room');
        setTimeout(() => {
          router.replace('/');
          setUser(null);
          resetMessage();
          setVideoUrl('');
          setShowPrompt(false);
        }, 600);
      }}
    >
      Leave Room
    </Button>
  );
}

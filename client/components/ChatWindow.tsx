'use client';

import { socket } from '@/lib/socket';
import { Message, useChatStore } from '@/store/chatStore';
import { Transition } from '@headlessui/react';
import { MessagesSquare } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';

import LiveChatInput from '@/components/LiveChatInput';

export default function ChatWindow() {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { messages } = useChatStore();
  const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    const listener = ({
      username,
      message,
      timeSent,
      isAction,
    }: {
      username: string;
      message: string;
      timeSent: string;
      isAction: boolean;
    }) => {
      const senderTime = new Date(timeSent);
      const localTime = senderTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      addMessage({
        name: username,
        message,
        timeSent: localTime,
        isAction: isAction,
      });

      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    socket.on('live-chat-text-from-server', listener);
    socket.on('action-message-from-server', listener);

    return () => {
      socket.off('live-chat-text-from-server', listener);
      socket.off('action-message-from-server', listener);
    };
  }, [addMessage]);

  return (
    <div className="h-full w-full">
      <Card
        isBlurred
        className="h-full border border-white/5 bg-white/5 backdrop-blur-md backdrop-saturate-150"
      >
        <CardBody className="overflow-y-auto h-[25vh] sm:max-h-[60vh]">
          {messages.map((message, index) => (
            <Transition
              key={index}
              as="div"
              show={true}
              enter="transform transition duration-700"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
            >
              {message.isAction ? (
                <ActionMessage action={message} />
              ) : (
                <ChatMessage message={message} />
              )}
            </Transition>
          ))}
          <div ref={messagesEndRef} />
        </CardBody>
        <CardFooter>
          <LiveChatInput />
        </CardFooter>
      </Card>
    </div>
  );
}

const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <div className="flex flex-col mb-3">
      <div className="w-full flex justify-between">
        <p className="text-foreground-400 text-[13px]">{message.name}</p>
        <p className="text-gray-400 text-[10px] flex items-center">
          {message.timeSent}
        </p>
      </div>
      <p className="text-[14px]">{message.message}</p>
    </div>
  );
};

const ActionMessage = ({ action }: { action: Message }) => {
  return (
    <div className="mb-3">
      <p className="text-[10px] flex items-center text-foreground-400">
        {action.name} {action.message}
        <span className="ml-auto">{action.timeSent}</span>
      </p>
    </div>
  );
};

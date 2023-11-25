"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { Message, useChatStore } from "@/store/chatStore";
import LiveChatInput from "@/components/LiveChatInput";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

export default function ChatWindow() {
  const { messages } = useChatStore();
  const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    const listener = ({
      username,
      message,
      time,
    }: {
      username: string;
      message: string;
      time: string;
    }) => {
      addMessage({ name: username, message, timeSent: time });
    };

    socket.on("live-chat-text-from-server", listener);

    return () => {
      socket.off("live-chat-text-from-server", listener);
    };
  }, [addMessage]);

  return (
    <div className="col-span-8 md:col-span-3 max-h-full">
      <Card isBlurred className="min-h-full max-h-full">
        <CardHeader>
          <p className="text-primary">Live Chat</p>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-y-auto max-h-[60vh]">
          {messages.map((message, index) => {
            return <ChatMessage key={index} message={message} />;
          })}
        </CardBody>
        <Divider />
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
        <p className="text-primary">{message.name}</p>
        <p className="text-gray-400 text-[10px] flex items-center">{message.timeSent}</p>
      </div>
      <p className="text-foreground-400 text-[14px]">{message.message}</p>
    </div>
  );
};

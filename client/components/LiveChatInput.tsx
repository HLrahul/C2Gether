import styles from "@/styles/input-styles.module.css";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { SendHorizontal } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { socket } from "@/lib/socket";
import { useChatStore } from "@/store/chatStore";
import { useUserStore } from "@/store/userStore";
import { Button, Input } from "@nextui-org/react";
import { liveChatTextSchema } from "@/lib/validations/liveChatTextSchema";

type text = z.infer<typeof liveChatTextSchema>;

export default function LiveChatInput() {
  const { roomId } = useParams();
  const { user } = useUserStore();
  const addMessage = useChatStore((state) => state.addMessage);

  const form = useForm<text>({
    resolver: zodResolver(liveChatTextSchema),
    defaultValues: {
      text: "",
    },
  });

  const handleSubmit = (data: text) => {
    user &&
      addMessage({
        name: user.username,
        message: data.text,
        timeSent: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      });
    socket.emit("live-chat-text", { roomId, username: user?.username, message: data.text });
    form.reset();
    form.setFocus("text");
  };

  return (
    <Form {...form}>
      <form
        id="live-chat-input-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full m-auto flex gap-2 items-center justify-center"
      >
        <FormField
          name="text"
          control={form.control}
          render={({ field }) => (
            <FormItem id="keyword" className="w-full">
              <FormControl>
                <Input
                  size="sm"
                  className={`${styles.inputWrapper} w-full`}
                  id="youtube-video-search-keyword"
                  autoComplete="off"
                  placeholder="Type to chat"
                  variant="flat"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="sm"
          isIconOnly
          variant="light"
          color="primary"
          className="h-10"
        >
          <SendHorizontal size={16} />
        </Button>
      </form>
    </Form>
  );
}

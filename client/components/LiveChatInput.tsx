
import * as z from "zod";
import { socket } from "@/lib/socket";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button, Input } from "@nextui-org/react";
import { liveChatTextSchema } from "@/lib/validations/liveChatTextSchema";

type text = z.infer<typeof liveChatTextSchema>;

export default function LiveChatInput () {
    const form = useForm<text>({
      resolver: zodResolver(liveChatTextSchema),
      defaultValues: {
        text: "",
      },
    });

    const handleSubmit = (data: text) => {
        socket.emit("live-chat-text", data);
        form.reset();
    }

    return (
      <Form {...form}>
        <form
          id="live-chat-input-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full m-auto flex gap-2"
        >
          <FormField
            name="text"
            control={form.control}
            render={({ field }) => (
              <FormItem id="keyword" className="w-full">
                <FormControl>
                  <Input
                    size="sm"
                    className="w-full"
                    id="youtube-video-search-keyword"
                    autoFocus
                    placeholder="Type to chat"
                    variant="bordered"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            id="live-chat-submit-button"
            color="primary"
            variant="solid"
          >
            Send
          </Button>
        </form>
      </Form>
    );
}
import { socket } from '@/lib/socket';
import { liveChatTextSchema } from '@/lib/validations/liveChatTextSchema';
import { useChatStore } from '@/store/chatStore';
import { useUserStore } from '@/store/userStore';
import styles from '@/styles/input-styles.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendHorizontal } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, Input } from '@nextui-org/react';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

type text = z.infer<typeof liveChatTextSchema>;

export default function LiveChatInput() {
  const { roomId } = useParams();
  const { user } = useUserStore();
  const addMessage = useChatStore((state) => state.addMessage);

  const form = useForm<text>({
    resolver: zodResolver(liveChatTextSchema),
    defaultValues: {
      text: '',
    },
  });

  const handleSubmit = (data: text) => {
    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    user &&
      addMessage({
        name: `${user.username} (You)`,
        message: data.text,
        timeSent: time,
        isAction: false,
      });
    socket.emit('live-chat-text', {
      roomId,
      username: user?.username,
      message: data.text,
      timeSent: new Date().toISOString(),
    });
    form.reset();
    form.setFocus('text');
  };

  return (
    <Form {...form}>
      <form
        id="live-chat-input-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex"
      >
        <FormField
          name="text"
          control={form.control}
          render={({ field }) => (
            <FormItem id="keyword" className="w-full space-y-0">
              <FormControl>
                <Input
                  classNames={{
                    base: 'w-full',
                    inputWrapper:
                      'h-14 bg-transparent hover:bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent border-none shadow-none rounded-none rounded-b-xl px-4',
                    input: 'text-sm',
                  }}
                  id="live-chat-text-input"
                  autoComplete="off"
                  placeholder="Type a message..."
                  {...field}
                  endContent={
                    <Button
                      type="submit"
                      size="sm"
                      isIconOnly
                      variant="light"
                      color="primary"
                      className="text-primary hover:bg-primary/20 transition-colors"
                    >
                      <SendHorizontal size={18} />
                    </Button>
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

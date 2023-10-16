"use client";

import * as z from "zod";
import { socket } from "@/lib/socket";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { joinRoomSchema } from "@/lib/validations/JoinRoomSchema";
type JoinRoomForm = z.infer<typeof joinRoomSchema>;

type propsType = {
    roomId: string;
    showDialog: boolean;
}

export default function JoinRoomPrompt(props: propsType) {

  const { roomId, showDialog } = props;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<JoinRoomForm>({
    resolver: zodResolver(joinRoomSchema),
    defaultValues: {
      username: "",
      roomId: roomId,
    },
  });

  function onSubmit({ roomId, username }: JoinRoomForm) {
    setIsLoading(true);
    socket.emit("join-room", { roomId, username });
  }

  useEffect(() => {
    socket.on("room-not-found", () => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      { showDialog && (
        <Dialog>
        <DialogContent className="w-[90vw] max-w-[400px]">
          <DialogHeader className="pb-2">
            <DialogTitle>Join the room now!</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roomId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Room ID" defaultValue={roomId} {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-2">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Join"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      )}
    </>
  );
}

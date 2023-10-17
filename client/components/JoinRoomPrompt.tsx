"use client"

import { z } from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { useUserStore } from "@/store/userStore";
import { useMembersStore } from "@/store/membersStore";
import { RoomJoinedData } from "@/types";
import { socket } from "@/lib/socket";
import { toast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";
import { Separator } from "./ui/separator";

type JoinRoomForm = z.infer<typeof joinRoomSchema>;

type propsType = {
  roomId: string;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function JoinRoomPrompt(props: propsType) {
  const setUser = useUserStore((state) => state.setUser);
  const setMembers = useMembersStore((state) => state.setMembers);

  const router = useRouter();
  const { roomId, showDialog, setShowDialog } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isHomeLoading, setIsHomeLoading] = useState(false);

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

  useEffect(() => {
    socket.on("room-joined", ({ user, members }: RoomJoinedData) => {
      setUser(user);
      setMembers(members);
      setShowDialog(false);
    });

    function handleErrorMessage({ message }: { message: string }) {
      toast({
        title: "Failed to join room!",
        description: message,
      });
    }

    socket.on("room-not-found", handleErrorMessage);

    socket.on("invalid-data", handleErrorMessage);

    return () => {
      socket.off("room-joined");
      socket.off("room-not-found");
      socket.off("invalid-data", handleErrorMessage);
    };
  }, [router, toast, setUser, setMembers]);

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
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

              <Button type="submit" className="mt-2">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Join"
                )}
              </Button>
            </form>
          </Form>

          <Separator />

          <Button
            onClick={(e) => {
              setIsHomeLoading(true);
              router.replace("/");
              setIsHomeLoading(false);
            }}
          >
            {isHomeLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Home"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

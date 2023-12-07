import * as z from "zod";
import { Home } from "lucide-react";
import { TbLogin2 } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { socket } from "@/lib/socket";
import { RoomJoinedData } from "@/types";
import { useToast } from "./ui/useToast";
import { useMembersStore } from "@/store/membersStore";
import { usePromptStore, useUserStore } from "@/store/userStore";
import { joinRoomFormSchema } from "@/lib/validations/joinRoomSchema";

type joinRoomForm = z.infer<typeof joinRoomFormSchema>;

export default function JoinRoomPrompt({ roomId }: { roomId: string }) {
  const { toast } = useToast();
  const setUser = useUserStore((state) => state.setUser);
  const setMembers = useMembersStore((state) => state.setMembers);
  const [isJoinLoading, setIsJoinLoading] = useState(false);
  const [isHomeLoading, setIsHomeLoading] = useState(false);
  const router = useRouter();
  const { showPrompt, setShowPrompt } = usePromptStore();
  const { onOpenChange } = useDisclosure();

  useEffect(() => {
    const handleLoading = () => setIsJoinLoading(false);
    socket.on("room-not-found", handleLoading);
    socket.on("invalid-data", handleLoading);
  }, []);

  useEffect(() => {
    const handleRoomJoined = ({ user, roomId, members }: RoomJoinedData) => {
      setUser(user);
      setMembers(members);
      setShowPrompt(false);
      router.replace(`/${roomId}`);
      setIsJoinLoading(false);
      socket.emit("client-ready", roomId);
    };

    const handleErrorMessage = ({ message }: { message: string }) => {
      toast({ title: "Failed to join room!", description: message });
      setIsJoinLoading(false);
    };

    socket.on("room-joined", handleRoomJoined);
    socket.on("room-not-found", handleErrorMessage);
    socket.on("invalid-data", handleErrorMessage);

    return () => {
      socket.off("room-joined", handleRoomJoined);
      socket.off("room-not-found", handleErrorMessage);
      socket.off("invalid-data", handleErrorMessage);
    };
  }, [toast, router, setUser, setMembers, setShowPrompt]);

  const form = useForm<joinRoomForm>({
    resolver: zodResolver(joinRoomFormSchema),
    defaultValues: { username: "", roomId },
  });

  const onSubmit = ({ username, roomId }: joinRoomForm) => {
    setIsJoinLoading(true);
    socket.emit("join-room", { username, roomId });
  };

  return (
    <Modal
      hideCloseButton
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      isOpen={showPrompt}
      backdrop="blur"
      onOpenChange={onOpenChange}
      placement="center"
    >
      <ModalContent>
        <ModalHeader>Join the Room</ModalHeader>
        <ModalBody>
          <Form {...form}>
            <form
              id="join-room-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl id="joinRoom-username">
                      <Input
                        id="joinRoom-username-input"
                        autoComplete="off"
                        label="Username"
                        autoFocus
                        placeholder="Enter a Name"
                        variant="bordered"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                id="submit-join-room-button"
                color="primary"
                variant="solid"
                type="submit"
                isLoading={isJoinLoading}
                endContent={<TbLogin2 />}
              >
                Join the Party
              </Button>

              <div className="flex gap-1 items-center mt-2 mb-2 justify-between">
                <Divider className="w-[45%]" />
                <p className="text-[0.7rem] text-primary-400">OR</p>
                <Divider className="w-[45%]" />
              </div>

              <Button
                color="primary"
                variant="solid"
                isLoading={isHomeLoading}
                startContent={<Home size={12} />}
                onClick={() => {
                  setIsHomeLoading(true);
                  socket.emit("leave-room");
                  router.replace("/");
                  setTimeout(() => {
                    setShowPrompt(false);
                  }, 4000);
                }}
              >
                Home
              </Button>
            </form>
          </Form>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

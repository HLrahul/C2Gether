"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Snippet } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
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
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useMembersStore } from "@/store/membersStore";
import { createRoomFormSchema } from "@/lib/validations/createRoomSchema";

interface CreateRoomFormProps {
  roomId: string;
}
type createRoomForm = z.infer<typeof createRoomFormSchema>;

export default function CreateRoomButton({ roomId }: CreateRoomFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);
  const setMembers = useMembersStore((state) => state.setMembers);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<createRoomForm>({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues: {
      username: "",
      roomId: roomId,
    },
  });

  function onSubmit({ username, roomId }: createRoomForm) {
    setIsLoading(true);
    socket.emit("create-room", { username, roomId });
  }

  useEffect(() => {
    socket.on("room-joined", ({ user, roomId, members }: RoomJoinedData) => {
      setUser(user);
      setMembers(members);
      router.replace(`/${roomId}`);
    });

    function handleErrorMessage({ message }: { message: string }) {
      toast({
        title: "Failed to join room!",
        description: message,
      });
      setIsLoading(false);
    }

    socket.on("room-not-found", handleErrorMessage);

    socket.on("invalid-data", handleErrorMessage);

    return () => {
      socket.off("room-joined");
      socket.off("room-not-found");
      socket.off("invalid-data", handleErrorMessage);
    };
  }, [toast, router, setUser, setMembers]);

  return (
    <>
      <Button
        id="open-modal-button"
        onPress={onOpen}
        color="primary"
        variant="solid"
        className="w-fit"
      >
        Create Room
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a Room
              </ModalHeader>
              <ModalBody>
                <Form {...form}>
                  <form
                    id="create-room-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                  >
                    <FormField
                      name="username"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem id="username">
                          <FormControl>
                            <Input
                              id="username-input"
                              autoComplete="off"
                              autoFocus
                              label="Username"
                              placeholder="Enter a Name"
                              variant="bordered"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />

                    <Snippet symbol="Room ID: " variant="bordered">
                      {roomId}
                    </Snippet>

                    <Button
                      type="submit"
                      id="submit-create-room-button"
                      color="primary"
                      variant="solid"
                      isLoading={isLoading}
                    >
                      Create Room
                    </Button>
                  </form>
                </Form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

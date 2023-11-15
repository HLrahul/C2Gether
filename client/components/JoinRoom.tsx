"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { TbLogin2 } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  ModalFooter,
} from "@nextui-org/react";
import { socket } from "@/lib/socket";
import { joinRoomFormSchema } from "@/lib/validations/joinRoomSchema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

type joinRoomForm = z.infer<typeof joinRoomFormSchema>;

export default function JoinRoom() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<joinRoomForm>({
    resolver: zodResolver(joinRoomFormSchema),
    defaultValues: { username: "", roomId: "" },
  });

  function onSubmit({ username, roomId }: joinRoomForm) {
    setIsLoading(true);
    socket.emit("join-room", { username, roomId });
  }

  useEffect(() => {
    socket.on("room-not-found", () => setIsLoading(false));
    socket.on("invalid-data", () => setIsLoading(false));
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        id="joinRoom-open-modal-button"
        onPress={onOpen}
        color="primary"
        variant="ghost"
        endContent={<TbLogin2 />}
      >
        Join Room
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          <ModalHeader>Join Room</ModalHeader>
          <ModalBody>
            <Form {...form}>
              <form
                id="join-room-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
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
                          autoFocus
                          label="Username"
                          placeholder="Enter a Name"
                          variant="bordered"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="roomId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl id="joinRoom-roomId">
                        <Input
                          id="joinRoom-roomId-input"
                          label="Room ID"
                          placeholder="Enter a Room ID"
                          variant="bordered"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  id="submit-join-room-button"
                  color="primary"
                  variant="solid"
                  type="submit"
                  isLoading={isLoading}
                  endContent={<TbLogin2 />}
                >
                  Join the Party
                </Button>
              </form>
            </Form>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TbLogin2 } from "react-icons/tb";
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

import { joinRoomFormSchema } from "@/lib/validations/joinRoomSchema";
import { socket } from "@/lib/socket";

type joinRoomForm = z.infer<typeof joinRoomFormSchema>;

export default function JoinRoom() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<joinRoomForm>({
    resolver: zodResolver(joinRoomFormSchema),
    defaultValues: {
      username: "",
      roomId: "",
    },
  });

  function onSubmit({ username, roomId }: joinRoomForm) {
    setIsLoading(true);

    socket.emit("join-room", { username, roomId });
  }

  useEffect(() => {
    socket.on("room-not-found", () => {
      setIsLoading(false);
    })

    socket.on("invalid-data", () => {
      setIsLoading(false);
    })
  })

  return (
    <>
      <Button
        id="joinRoom-open-modal-button"
        onPress={onOpen}
        color="primary"
        variant="light"
        className="w-fit"
        endContent={<TbLogin2 />}
      >
        Join Room
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
                Join Room
              </ModalHeader>
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
                          <FormMessage className="text-xs text-red-500" />
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
                          <FormMessage className="text-xs text-red-500" />
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
                      Join Room
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

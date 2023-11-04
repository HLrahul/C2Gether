"use client"

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TbLogin2 } from "react-icons/Tb"

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

    function onSubmit(data: joinRoomForm) {
      setIsLoading(true);
    }

    return (
      <>
        <Button
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

                      <div className="flex justify-between items-center">
                        <Button
                          color="danger"
                          variant="ghost"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button
                          color="primary"
                          variant="solid"
                          type="submit"
                          isLoading={isLoading}
                          endContent={<TbLogin2 />}
                        >
                          Join Room
                        </Button>
                      </div>
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
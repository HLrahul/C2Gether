"use client";

import React, { useState } from "react";
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
import { createRoomFormSchema } from "@/lib/validations/createRoomSchema";

interface CreateRoomFormProps {
    roomId: string;
}
type createRoomForm= z.infer<typeof createRoomFormSchema>;

export default function CreateRoomButton({ roomId }: CreateRoomFormProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<createRoomForm>({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit (data: createRoomForm) {
    setIsLoading(true);
  }


  return (
    <>
      <Button onPress={onOpen} color="primary" variant="solid" className="w-fit">
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

                    <div className="flex justify-between items-center">
                      <Button color="danger" variant="ghost" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" variant="solid" type="submit" isLoading={isLoading}>
                        Create Room
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

'use client';

import { socket } from '@/lib/socket';
import { joinRoomFormSchema } from '@/lib/validations/joinRoomSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TbLogin2 } from 'react-icons/tb';
import * as z from 'zod';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

type joinRoomForm = z.infer<typeof joinRoomFormSchema>;

export default function JoinRoom() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<joinRoomForm>({
    resolver: zodResolver(joinRoomFormSchema),
    defaultValues: { username: '', roomId: '' },
  });

  function onSubmit({ username, roomId, password }: joinRoomForm) {
    setIsLoading(true);
    socket.emit('join-room', { username, roomId, password });
  }

  useEffect(() => {
    socket.on('room-not-found', () => setIsLoading(false));
    socket.on('invalid-data', () => setIsLoading(false));
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
        classNames={{
          closeButton: 'absolute right-4 top-4 hover:bg-white/5',
        }}
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
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl id="joinRoom-password">
                        <Input
                          id="joinRoom-password-input"
                          label="Password (if applicable)"
                          placeholder="Enter Room Password"
                          variant="bordered"
                          type="password"
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

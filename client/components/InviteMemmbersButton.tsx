"use client";

import { useParams } from "next/navigation";
import { Button } from "@nextui-org/button";
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet,
  useDisclosure,
} from "@nextui-org/react";

export default function InviteMembersButton() {
  const { roomId } = useParams();
  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${roomId}`;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="w-full"
        variant="solid"
        color="primary"
        onPress={onOpen}
      >
        Invite members
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          <ModalHeader>Invite link</ModalHeader>
          <ModalBody>
            <Snippet symbol="Link: " variant="bordered">
              {currentUrl.length > 25
                ? `${currentUrl.substring(0, 25)}...`
                : currentUrl}
            </Snippet>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

import { useEffect } from "react";

import { socket } from "@/lib/socket";
import { Modal, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";


export default function DisconnectedNote () {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
    useEffect(() => {
      socket.on("disconnected", () => {
        onOpen();
      });

      return () => {
        socket.off("disconnected");
      };
    }, [onOpen]);
    
    return (

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalHeader>You are Disconnected!</ModalHeader>
        <ModalContent>
          You were out of the browser for a while and lost the connection.
          Please create a new room or join a room to draw again.
        </ModalContent>
      </Modal>
    );
}
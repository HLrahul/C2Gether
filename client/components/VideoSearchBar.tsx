"use client";

import {
  Button,
  Divider,
  Input,
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import LoadedSkeletonCard from "./LoadedSkeletonCard";

export default function VideoSearchBar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        variant="solid"
        onPress={onOpen}
        startContent={<SearchIcon size={18} />}
        className="w-fit"
      >
        Type to Search
      </Button>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-[1rem]">
            <Input
              id="youtube-video-search-keyword"
              autoFocus
              startContent={<SearchIcon size={16} />}
              endContent={
                <Kbd className="text-foreground bg-background/80 hidden sm:block md:block lg:block">
                  Esc
                </Kbd>
              }
            />
            <Button>Get Videos from Youtube</Button>
          </ModalHeader>
          <Divider className="mb-4" />

          <ModalBody>
            <LoadedSkeletonCard />
          </ModalBody>

          <Divider className="mt-4" />
          <ModalFooter className="justify-center">
            <p className="text-sm text-foreground-400">
              Every Vidoes are fetched from Youtube.
            </p>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

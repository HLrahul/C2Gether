"use client";

import { useState } from "react";

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
import { ArrowDown, ArrowUp, SearchIcon } from "lucide-react";

import { Video } from "@/types";
import { useFetchVideos } from "@/hooks/useFetchVideos";
import { useVideoStore } from "@/store/videosStore";

import { VideoCard } from "./VideoCard";

export default function VideoSearchBar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const { fetchedVideos, setFetchedVideos } = useVideoStore((state) => state);
  const reset = () => setFetchedVideos([]);

  const { isLoading, error, isFetching, fetchNextPage, hasNextPage } =
    useFetchVideos(searchKeyword);

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    reset();
    fetchNextPage();
  };

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
        size="full"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        hideCloseButton
        scrollBehavior="outside"
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
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </ModalHeader>
          <Divider className="mb-4" />

          <ModalBody className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fetchedVideos &&
              fetchedVideos.length > 0 &&
              fetchedVideos.map((video) => (
                <VideoCard key={video.id.videoId} video={video} />
              ))}

            {isLoading && (
              <p className="flex col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
              </p>
            )}

            {error && !fetchedVideos && (
              <p className="text-red-500 w-full text-center">
                Unable to fetch Videos. Try again!
              </p>
            )}
          </ModalBody>

          <Divider className="mt-4" />
          <ModalFooter className="flex flex-col justify-center items-center gap-4">
            {fetchedVideos && hasNextPage && (
              <Button
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  fetchNextPage();
                }}
                isLoading={isFetching}
              >
                load more
              </Button>
            )}

            <p className="text-[0.8rem] text-foreground/70">
              Videos are fetched from Youtube.
            </p>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

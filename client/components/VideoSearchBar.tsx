"use client";

import { useState } from "react";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { VideoCard } from "./VideoCard";
import { SearchIcon } from "lucide-react";
import { useVideoStore } from "@/store/videosStore";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchVideos } from "@/hooks/useFetchVideos";

export default function VideoSearchBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearchOperation, setIsSearchOperation] = useState(false);
  const { fetchedVideos, setFetchedVideos } = useVideoStore((state) => state);
  const { isLoading, error, fetchNextPage, isFetching, hasNextPage, refetch } =
    useFetchVideos(searchKeyword, isSearchOperation);
  const queryClient = useQueryClient();

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    queryClient.removeQueries({ queryKey: ["videos"] });
    setIsSearchOperation(true);
    setFetchedVideos([]);
    refetch();
  };

  return (
    <>
      <Button
        variant="solid"
        onPress={onOpen}
        startContent={<SearchIcon size={18} />}
        className="w-full hover:bg-primary hover:text-white"
      >
        Type to Search
      </Button>

      <Modal
        size="full"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onClose}
        placement="center"
        scrollBehavior="outside"
      >
        <ModalContent>
          <ModalHeader className="flex gap-[1rem] w-[80%] md:w-[70%] lg:w-[50%] m-auto">
            <Input
              id="youtube-video-search-keyword"
              autoFocus
              startContent={<SearchIcon size={16} className="text-primary" />}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </ModalHeader>
          <Divider className="mb-4" />

          <ModalBody className="bg-transparent h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fetchedVideos &&
              fetchedVideos.map((video, index) => (
                <VideoCard
                  key={video.id.videoId || index}
                  video={video}
                  onClose={onClose}
                />
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
                onClick={(e) => {
                  e.preventDefault();
                  setIsSearchOperation(false);
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

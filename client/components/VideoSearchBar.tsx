"use client";

import { useEffect, useState } from "react";

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

import { Video } from "@/types";
import { useFetchVideos } from "@/hooks/useFetchVideos";
import { useVideoStore } from "@/store/videosStore";

import { VideoCard } from "./VideoCard";

export default function VideoSearchBar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [shouldFetch, setShouldFetch] = useState(false);
  
  const { fetchedVideos, setFetchedVideos } = useVideoStore((state) => state);
  const reset = () => setFetchedVideos([]);

  const {
    data,
    isLoading,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useFetchVideos(searchKeyword, shouldFetch);


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
        size="md"
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
            <Button
              onClick={(e) => {
                e.preventDefault();
                reset();
                setShouldFetch(true);
              }}
            >
              Search
            </Button>
          </ModalHeader>
          <Divider className="mb-4" />

          <ModalBody className="flex flex-col gap-5">
            {fetchedVideos &&
              fetchedVideos.length > 0 &&
              fetchedVideos.map((video) => (
                <VideoCard key={video.id.videoId} video={video} />
              ))}

            {fetchedVideos && hasNextPage && (
              <Button
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  fetchNextPage();
                }}
              >
                load more
              </Button>
            )}

            {error && !fetchedVideos && (
              <p className="text-red-500 w-full text-center">
                Unable to fetch Videos. Try again!
              </p>
            )}
          </ModalBody>

          <Divider className="mt-4" />
          <ModalFooter className="flex justify-center items-center">
            <p className="text-[0.8rem] text-foreground/70" >Videos are fetched from Youtube.</p>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

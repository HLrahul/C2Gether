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

import { Item, Video } from "@/types";
import { useFetchVideos } from "@/hooks/useFetchVideos";

import LoadedSkeletonCard from "./LoadedSkeletonCard";
import LoadingSkeletonCard from "./LoadingSkeletonCard";

export default function VideoSearchBar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [fetchedVideos, setFetchedVideos] = useState<Video[] | undefined>();
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, error, isFetching, fetchNextPage, hasNextPage } =
    useFetchVideos(searchKeyword, shouldFetch);

  useEffect(() => {
    if (data) {
      setFetchedVideos(
        data.pages.flatMap((page) =>
          page.items.map((item: Item) => {
            return {
              kind: item.kind,
              etag: item.etag,
              id: item.id,
              snippet: {
                publishedAt: item.snippet.publishedAt,
                channelId: item.snippet.channelId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnails: item.snippet.thumbnails,
                channelTitle: item.snippet.channelTitle,
                liveBroadcastContent: item.snippet.liveBroadcastContent,
                publishTime: item.snippet.publishTime,
              },
            };
          })
        )
      );
    }
  }, [data]);

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
        size="xs"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="auto"
        hideCloseButton
        scrollBehavior="inside"
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
                setShouldFetch(true);
              }}
            >
              Search
            </Button>
          </ModalHeader>
          <Divider className="mb-4" />

          <ModalBody className="min-h-[30vh]">
            {!shouldFetch && <LoadedSkeletonCard />}

            {shouldFetch && isLoading && <LoadingSkeletonCard />}
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

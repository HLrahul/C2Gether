"use client";

import styles from "@/styles/input-styles.module.css";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchKeywordSchema } from "@/lib/validations/searchKeywordSchema";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { VideoCard } from "./VideoCard";
import { LoadingSpinner } from "./icons";
import { SearchIcon } from "lucide-react";
import { useVideoStore } from "@/store/videosStore";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchVideos } from "@/hooks/useFetchVideos";
import { useVideoUrlStore } from "@/store/videoUrlStore";

type searchKeyword = z.infer<typeof searchKeywordSchema>;

export default function VideoSearchInput() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isSearchOperation, setIsSearchOperation] = useState<boolean>(false);
  const { fetchedVideos, setFetchedVideos } = useVideoStore((state) => state);
  const { isLoading, error, fetchNextPage, isFetching, hasNextPage, refetch } =
    useFetchVideos(searchKeyword, isSearchOperation);
  const queryClient = useQueryClient();
  const setVideoUrl = useVideoUrlStore((state) => state.setVideoUrl);

  const form = useForm<searchKeyword>({
    resolver: zodResolver(searchKeywordSchema),
    defaultValues: {
      keyword: searchKeyword,
    },
  });

  const { watch } = form;
  const keyword = watch("keyword");
  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  const getVideoIdFromUrl = (url: string) => {
    const patterns = [
      {
        platform: "youtube",
        pattern:
          /(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\&list=)([^#\&\?]*).*/,
      },
      {
        platform: "vimeo",
        pattern: /(vimeo)\.com\/([a-zA-Z0-9]+)(\/[a-zA-Z0-9]+)?\/?/,
      },
      {
        platform: "dailymotion",
        pattern: /(dailymotion)\.com\/video\/([a-zA-Z0-9]+)\/?/,
      },
    ];

    for (let i = 0; i < patterns.length; i++) {
      const matches = url.match(patterns[i].pattern);
      if (matches && matches[2]) {
        return {
          platform: patterns[i].platform,
          id: matches[2],
          hash: matches[3] ? matches[3].substring(1) : "",
        };
      }
    }

    return { platform: "unknown", id: "", hash: "" };
  };

  const handleSearch = form.handleSubmit(() => {
    setIsSearchOperation(true);
    queryClient.removeQueries({ queryKey: ["videos"] });
    setFetchedVideos([]);
    refetch();
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKeyword(value);
    form.setValue("keyword", value);

    const videoUrl = getVideoIdFromUrl(e.target.value);
    if (videoUrl.platform !== "unknown") {
      switch (videoUrl.platform) {
        case "youtube":
          setVideoUrl(`https://www.youtube.com/embed/${videoUrl.id}`);
          break;
        case "vimeo":
          setVideoUrl(`https://player.vimeo.com/video/${videoUrl.id}`);
          break;
        case "dailymotion":
          setVideoUrl(`https://www.dailymotion.com/embed/video/${videoUrl.id}`);
          break;
        default:
          onOpen();
      }
    } else {
      onOpen();
    }
  };

  const onFocus = (event: React.FocusEvent<Element>) => {
    const value = (event.target as HTMLInputElement).value;
    const videoId = getVideoIdFromUrl(value);
    if (videoId.id) {
      (event.target as HTMLInputElement).select();
    }
  };

  return (
    <div className="col-span-8">
      <div>
        <Input
          size="sm"
          className={`${styles.inputWrapper} text-primary`}
          value={searchKeyword}
          onChange={handleInputChange}
          onFocus={onFocus}
          endContent={<SearchIcon size={16} className="text-foreground" />}
          placeholder="Paste the link of the Video or type to search"
        />

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
              <Form {...form}>
                <form
                  id="search-videos-form"
                  onSubmit={handleSearch}
                  className="w-full m-auto flex gap-4"
                >
                  <FormField
                    name="keyword"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem id="keyword" className="w-full">
                        <FormControl>
                          <Input
                            size="sm"
                            className={`${styles.inputWrapper} text-primary`}
                            id="youtube-video-search-keyword"
                            autoFocus
                            startContent={
                              <SearchIcon size={16} className="text-primary" />
                            }
                            placeholder="Search for videos"
                            variant="bordered"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    id="search-videos-button"
                    color="primary"
                    variant="solid"
                  >
                    Search
                  </Button>
                </form>
              </Form>
            </ModalHeader>
            <Divider className="mb-4" />

            <ModalBody className="bg-transparent h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {fetchedVideos &&
                fetchedVideos.map((video, index) => (
                  <VideoCard
                    key={video.id.playlistId || video.id.videoId || index}
                    video={video}
                    onClose={onClose}
                  />
                ))}

              {isLoading && (
                <p className="flex col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 items-center justify-center">
                  <LoadingSpinner />
                </p>
              )}

              {error && !fetchedVideos && (
                <p className="text-red-500 w-full text-center">
                  Unable to fetch Videos. Try again!
                </p>
              )}
            </ModalBody>
            <Divider className="mt-4" />
            <ModalFooter className="flex flex-col justify-center items-center w-[80%] md:w-[70%] lg:w-[50%] m-auto gap-4">
              {fetchedVideos && hasNextPage && (
                <Button
                  className="w-full hover:bg-primary"
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
      </div>
    </div>
  );
}

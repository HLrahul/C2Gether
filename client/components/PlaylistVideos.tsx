import { PlaylistVideo } from "@/types";
import { VideoIcon } from "lucide-react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import PlaylistVideosCard from "@/components/PlaylistVideosCard";

interface PlaylistVideosProps {
  videos: number;
  playlistVideos: PlaylistVideo[];
}

export default function PlaylistVideos({ videos, playlistVideos }: PlaylistVideosProps) {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-10 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  return (
    <Accordion
      isCompact
      showDivider={false}
      className="p-2 flex flex-col gap-1 w-full"
      variant="shadow"
      itemClasses={itemClasses}
    >
      <AccordionItem
        key="1"
        aria-label="playlist"
        startContent={<VideoIcon className="text-primary" />}
        subtitle={
          <p className="text-primary">{`${videos} videos`}</p>
        }
        title="Playlist"
      >
        <div className="overflow-y-auto max-h-64">
          {playlistVideos?.map((video) => {
            return (
              <PlaylistVideosCard
                key={video?.snippet?.resourceId?.videoId}
                video={video}
              />
            );
          })}
        </div>
      </AccordionItem>
    </Accordion>
  );
}

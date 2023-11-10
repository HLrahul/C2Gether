import { Card, CardBody, Image } from "@nextui-org/react";

import { Id, Snippet } from "@/types";

interface VideoCardProps {
  video: {
    kind: string;
    etag: string;
    id: Id;
    snippet: Snippet;
  };
}

export const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <Card isPressable isBlurred className="border-none w-full">
      <CardBody>
        <div className="grid grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-12 aspect-w-16 aspect-h-9">
            <Image
              alt={video.snippet.title || "Video"}
              className="object-cover w-full h-full"
              shadow="md"
              src={video.snippet.thumbnails.high.url}
            />
          </div>

          <div className="flex flex-col col-span-12 h-full">
            <div className="flex flex-col h-full justify-between items-start gap-4">
              <h3
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="font-semibold text-foreground/90"
              >
                {video.snippet.title}
              </h3>
              <p className="text-small text-foreground/80">
                {video.snippet.channelTitle}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

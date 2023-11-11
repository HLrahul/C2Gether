import { Avatar, Card, CardBody, Chip, Image } from "@nextui-org/react";

import { Video } from "@/types";
import { Eye, ThumbsUp } from "lucide-react";

export const VideoCard = ({ video }: { video: Video }) => {
  
  function convertDuration(duration: string) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    if (match === null) {
      return "0:00";
    }

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    let formattedDuration = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    if (hours > 0) {
      formattedDuration = `${hours}:${formattedDuration}`;
    }

    return formattedDuration;
  }

  return (
    <Card isPressable isBlurred className="border-none w-full">
      <CardBody>
        <div className="grid grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-12 aspect-w-16 aspect-h-9">
            <Image
              alt={video.snippet.title || "Video"}
              className="z-1 object-cover w-full h-full"
              shadow="md"
              src={video.snippet.thumbnails.high.url}
            />
            <div className="z-2 absolute bottom-6 right-0">
              <Chip
                size="sm"
                className="rounded-sm text-[0.8rem] bg-black text-white flex justify-center items-center"
              >
                {convertDuration(video.duration)}
              </Chip>
            </div>
          </div>

          <div className="flex flex-col flex-grow col-span-12 gap-5 justify-between items-start">
            {/* <div className="flex gap-2">
              <Chip size="sm" className="text-[0.8rem] rounded-md" startContent={ <Eye size={18} /> }>16K</Chip>
              <Chip size="sm" className="text-[0.8rem] rounded-md" startContent={ <ThumbsUp size={16} /> }>10K</Chip>
            </div> */}

            <div className="flex flex-col h-full justify-between items-start gap-1">
              <h3
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="h-[3em] font-semibold text-foreground/90"
              >
                {video.snippet.title}
              </h3>
              <h3
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="h-[3em] font-lighter text-sm text-foreground/80"
              >
                {video.snippet.description}
              </h3>
            </div>

            <div className="flex gap-2 items-center">
              <Avatar size="sm" src={video.channelLogo} />
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

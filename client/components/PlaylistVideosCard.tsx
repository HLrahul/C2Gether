import { PlaylistVideo } from "@/types";
import { useVideoUrlStore } from "@/store/videoUrlStore";
import { Card, CardBody, Image } from "@nextui-org/react";

interface PlaylistVideosCardProps {
  video: PlaylistVideo;
  index: number;
}

export default function PlaylistVideosCard({ video, index }: PlaylistVideosCardProps) {
  const { videoUrl } = useVideoUrlStore();
  const setVideoUrl = useVideoUrlStore((state) => state.setVideoUrl);

  return (
    <Card
      isBlurred
      className="border-none w-full hover:bg-primary mt-3"
      isPressable
      // onClick={() =>
      //   setVideoUrl(
      //     `https://www.youtube.com/watch?v=${
      //       video.snippet.resourceId.videoId
      //     }&list=${videoUrl.split("list=")[1]}&index=${index}`
      //   )
      // }
    >
      <CardBody>
        <div className="flex w-full">
          <div className="w-12">
            <Image
              alt={video.snippet.title || "Video"}
              className="z-1 object-cover w-full h-full"
              shadow="md"
              src={video.snippet.thumbnails.medium.url}
            />
          </div>
          <div className="ml-2">
            <h3 className="font-semibold text-foreground/90">
              {video.snippet.title}
            </h3>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

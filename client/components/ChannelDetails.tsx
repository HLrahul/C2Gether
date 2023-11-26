import { Avatar } from "@nextui-org/react";

interface ChannelDetailsProps {
  channelDetails: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

export default function ChannelDetails({ channelDetails }: ChannelDetailsProps) {
  return (
      <div className="flex gap-4 items-center mt-4">
        <Avatar
          isBordered
          color="primary"
          size="md"
          src={channelDetails?.thumbnails.default.url}
        />
        <p className="text-small text-foreground/80 font-extrabold">
          {channelDetails?.title}
        </p>
      </div>
  );
}

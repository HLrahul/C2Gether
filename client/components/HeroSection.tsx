import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { Video, MessagesSquare, AudioLines, Brush } from "lucide-react";

const cardData = [
  {
    Icon: Video,
    title: "Synced video player",
    description: (
      <p className="text-gray-500">
        Stream videos with your friends and{" "}
        <span className="text-foreground">stay in sync with every action.</span>
      </p>
    ),
    upcoming: false,
  },
  {
    Icon: MessagesSquare,
    title: "Live chat",
    description: (
      <p className="text-gray-500">
        Share your thoughts, reaction with your buddies in
        <span className="text-foreground"> real time chat.</span>
      </p>
    ),
    upcoming: false,
  },
  {
    Icon: AudioLines,
    title: "Voice channels",
    description: (
      <p className="text-gray-500">
        Talk to your friends with
        <span className="text-foreground"> audio chat </span>while watching
        videos in sync.
      </p>
    ),
    upcoming: true,
  },
  {
    Icon: Brush,
    title: "Canvas",
    description: (
      <p className="text-gray-500">
        Talk to your friends with
        <span className="text-foreground"> audio chat </span>while watching
        videos in sync.
      </p>
    ),
    upcoming: true,
  },
];

interface CardData {
  Icon: React.ComponentType;
  title: string;
  description: JSX.Element;
  upcoming: boolean;
}

const CardComponent = ({ Icon, title, description, upcoming }: CardData) => (
  <Card
    isFooterBlurred
    className="border-none bg-transparent w-[100%]"
    style={{ width: "auto" }}
  >
    <CardHeader className="flex items-center gap-3 w-auto">
      <div className="text-primary-300">
        <Icon />
      </div>
      <p className="text-[0.8rem] w-full">{title}</p>
      {upcoming && (
        <Chip size="sm" className="ml-auto bg-primary rounded-lg">
          upcoming
        </Chip>
      )}
    </CardHeader>
    <CardBody className="text-sm">{description}</CardBody>
  </Card>
);

export default function HeroSection() {
  return (
    <section className="w-full flex flex-wrap gap-3">
      {cardData.map((data, index) => (
        <CardComponent key={index} {...data} />
      ))}
    </section>
  );
}

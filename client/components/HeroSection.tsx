import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { Video, MessagesSquare, AudioLines, Brush } from "lucide-react";

const cardData = [
  {
    Icon: Video,
    className: "animate-featureCard",
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
    className: "animate-featureCard animation-delay-2000",
    title: "Live chat",
    description: (
      <p className="text-gray-500">
        Share your thoughts and reactions with your buddies in
        <span className="text-foreground"> real time chat.</span>
      </p>
    ),
    upcoming: false,
  },
  {
    Icon: AudioLines,
    className: "animate-featureCard animation-delay-1000",
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
    className: "animate-featureCard animation-delay-2500",
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
  className: string;
  title: string;
  description: JSX.Element;
  upcoming: boolean;
}

const CardComponent = ({
  Icon,
  className,
  title,
  description,
  upcoming,
}: CardData) => (
  <Card
    isFooterBlurred
    radius="lg"
    className={`${className} border-none col-span-1 row-span-1 bg-transparent min-h-[6rem] w-auto m-auto`}
  >
    <CardHeader className="flex items-center gap-3">
      <div className="text-primary-300">
        <Icon />
      </div>
      <p className="text-[0.8rem]">{title}</p>
      {upcoming && (
        <Chip size="sm" className="ml-auto bg-primary rounded-lg">
          upcoming
        </Chip>
      )}
    </CardHeader>
    <CardBody>{description}</CardBody>
  </Card>
);

export default function HeroSection() {
  return (
    <section className="w-[100%] md:w-[50%] m-auto grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-5 lg:mt-[8rem]">
      {cardData.map((data, index) => (
        <CardComponent key={index} {...data} />
      ))}
    </section>
  );
}

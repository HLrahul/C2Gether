interface VideoDetailsContentProps {
  videoDetails: {
    title: string;
    description: string;
  };
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export default function VideoDetailsContent({
  videoDetails,
  isExpanded,
  setIsExpanded,
}: VideoDetailsContentProps) {
  return (
    <div className="flex flex-col gap-4 mb-2">
      <div className="flex flex-col gap-2">
        <p className="font-bold">{videoDetails?.title}</p>
        {videoDetails?.description && (
          <p
            className={`text-default-400 text-sm transition-all duration-500 ease-in-out transform overflow-hidden ${
              isExpanded ? "max-h-full" : "max-h-[3em]"
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {videoDetails?.description}
          </p>
        )}
      </div>
    </div>
  );
}

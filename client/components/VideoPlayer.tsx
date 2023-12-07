// "use client";

// import "@/styles/video-player.css";

// import { useEffect, useState } from "react";

// import dynamic from "next/dynamic";
// import { useParams } from "next/navigation";
// import { Skeleton } from "@nextui-org/react";
// import { ArrowUpToLine } from "lucide-react";

// import { socket } from "@/lib/socket";
// import VideoDetails from "./VideoDetails";
// import { useVideoUrlStore } from "@/store/videoUrlStore";

// const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

// export default function VideoPlayer() {
//   const { roomId } = useParams();
//   const { videoUrl } = useVideoUrlStore();
//   const setVideoUrl = useVideoUrlStore((state) => state.setVideoUrl);

//   const [playbackRate, setPlaybackRate] = useState<number>(1);

//   const [player, setPlayer] = useState<any>(null);
//   const [isLoaded, setIsLoaded] = useState<boolean>(false);
//   const [isPlaying, setIsPlaying] = useState<boolean>(true);

//   useEffect(() => {
//     if (videoUrl !== "")
//       socket.emit("video-change", { roomId, serverUrl: videoUrl });
//   }, [roomId, videoUrl]);

//   useEffect(() => {
//     socket.emit("client-ready", roomId);
//     socket.on("get-player-state", () => {
//       if (player) {
//         const currentTime = player.getCurrentTime();
//         socket.emit("send-player-state", {
//           roomId,
//           currentTime,
//           serverUrl: videoUrl,
//         });
//       }
//     });
//     socket.on("player-state-from-server", ({ serverUrl, currentTime }) => {
//       setIsLoaded(true);
//       setVideoUrl(serverUrl);
//       if (player) player.seekTo(currentTime);
//     });
//     socket.on("player-play-from-server", () => {
//       if (player && !isPlaying) setIsPlaying(true);
//     });
//     socket.on("player-pause-from-server", () => {
//       if (player && isPlaying) setIsPlaying(false);
//     });
//     socket.on("player-seek-from-server", (currentTime: number) => {
//       if (player) player.seekTo(currentTime);
//     });
//     socket.on("playback-rate-change-from-server", (playbackRate) => {
//       if (player) {
//         setPlaybackRate(playbackRate);
//       }
//     });
//     socket.on("video-change-from-server", ({ serverUrl }) => {
//       if (videoUrl !== serverUrl) {
//         setVideoUrl(serverUrl);
//       }
//     });

//     return () => {
//       socket.off("get-player-state");
//       socket.off("player-play-from-server");
//       socket.off("player-seek-from-server");
//       socket.off("player-pause-from-server");
//       socket.off("player-state-from-server");
//       socket.off("video-change-from-server");
//       socket.off("playback-rate-change-from-server");
//     };
//   }, [isPlaying, player, roomId, setVideoUrl, videoUrl]);

//   const onReady = (player: any) => {
//     setPlayer(player);
//   };
//   const onPlay = () => {
//     if (player && !isPlaying) {
//       socket.emit("player-play", { roomId });
//       setIsPlaying(true);
//     }
//   };
//   const onPause = () => {
//     if (player && isPlaying) {
//       socket.emit("player-pause", { roomId });
//       setIsPlaying(false);
//     }
//   };
//   const onSeek = (seek: number) => {
//     socket.emit("player-seek", { roomId, seek });
//   };
//   const onPlaybackRateChange = (playbackRate: number) => {
//     socket.emit("playback-rate-change", { roomId, playbackRate });
//   };
//   const onEnded = () => {
//     if (player) {
//       player.seekTo(0);
//       setTimeout(() => {
//         setIsPlaying(true);
//       }, 1000);
//     }
//   };

//   return (
//     <div className="col-span-8 md:col-span-5">
//       <Skeleton isLoaded className="w-5/5 rounded-lg mb-5">
//         {!isLoaded && (
//           <div className="absolute h-full w-full bg-foreground-800 flex flex-col items-center justify-start">
//             <ArrowUpToLine className="" />
//             <p className="w-[70%] h-[90%] flex items-center justify-center text-center">
//               Paste a youtube video link or start typing to search a video from
//               youtube.
//             </p>
//           </div>
//         )}
//         <div className="video-responsive">
//           <ReactPlayer
//             key={videoUrl}
//             url={videoUrl}
//             className="react-player"
//             height="100%"
//             width="100%"
//             controls={true}
//             playing={isPlaying}
//             muted={false}
//             pip={true}
//             stopOnUnmount={false}
//             onReady={onReady}
//             onPlay={onPlay}
//             onPause={onPause}
//             onSeek={onSeek}
//             playbackRate={playbackRate}
//             onPlaybackRateChange={onPlaybackRateChange}
//             onEnded={onEnded}
//           />
//         </div>
//       </Skeleton>

//       <VideoDetails isVideoSet={isLoaded} />
//     </div>
//   );
// }

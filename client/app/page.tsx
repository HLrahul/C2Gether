"use client";

import { nanoid } from "nanoid";
import { useTheme } from "next-themes";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { Divider } from "@nextui-org/react";
import JoinRoom from "@/components/JoinRoom";
import BottomBar from "@/components/BottomBar";
import HeroSection from "@/components/HeroSection";
import CreateRoomButton from "@/components/CreateRoom";

export default function Home() {
  const { theme } = useTheme();
  const [ blobTwoColor, setBlobTwoColor ] = useState("");
  const [ blobOneStyles, setBlobOneStyles ] = useState("");
  const [ roomId, setRoomId ] = useState<string>(nanoid());

  useEffect(() => {
    setBlobOneStyles(
      theme === "teal-dark"
        ? "absolute inset-y-16 inset-x-0 h-[14rem] w-32 rounded-full rotate-90 my-auto mx-[40%] sm:mx-[20%] bg-gradient-to-b from-teal-500 to-primary-500 blur-3xl scale-y-150 opacity-75 animate-blob"
        : ""
    );
    setBlobTwoColor(
      theme === "teal-dark" ? "bg-gradient-to-b from-white-500 to-white-500" : ""
    );
  }, [theme]);

  return (
    <>
      <Navbar />
      <div className={blobOneStyles}></div>
      <div
        className={`absolute inset-y-16 inset-x-0 h-[14rem] w-32 rounded-full rotate-90 my-auto mx-[50%] sm:mx-[25%] blur-3xl scale-y-150 opacity-75 animate-blobTwo ${blobTwoColor}`}
      ></div>

      <section className="relative min-h-[90vh] w-full lg:w-[70%] m-auto px-5 lg:px-0 flex flex-col md:flex-row gap-14 md:gap-2">
        <div className="w-full md:w-[50%] min-h-[20vh] md:h-[80vh] flex flex-col items-center md:items-start mt-[20%] md:mt-0 md:justify-center space-y-4">
          <p className="text-[1.75rem] sm:text-[2.5rem] md:text-[3rem] text-center md:text-left">
            Watch videos <span className="text-primary">together</span> with
            whom you want to.
          </p>
          <div className="flex space-x-4">
            <CreateRoomButton roomId={roomId} />
            <Divider orientation="vertical" className="text-foreground" />
            <JoinRoom />
          </div>
        </div>

        <HeroSection />
      </section>
        <BottomBar />
    </>
  );
}

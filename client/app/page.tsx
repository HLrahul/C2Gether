import { nanoid } from "nanoid";
import Navbar from "@/components/navbar";
import { Divider } from "@nextui-org/react";
import JoinRoom from "@/components/JoinRoom";
import BottomBar from "@/components/BottomBar";
import HeroSection from "@/components/HeroSection";
import CreateRoomButton from "@/components/CreateRoom";

export default function Home() {
  const roomId = nanoid();

  return (
    <>
      <Navbar />

      <section className="absolute  min-h-[90vh] w-full flex flex-col justify-between px-5 sm:px-0 md:px-0 lg:px-0">
        <div className="flex flex-col m-auto min-h-[30vh] sm:h-[30vh] md:h-[25vh] w-full sm:w-[100%] md:w-[70%] justify-center sm:justify-end md:justify-end lg:justify-end items-center gap-4">
          <h1 className="text-3xl md:text-5xl text-center">
            Spend Quality time with your colleagues and friends.
          </h1>
          <div className="flex space-x-4  ">
            <CreateRoomButton roomId={roomId} />
            <Divider orientation="vertical" />
            <JoinRoom />
          </div>
        </div>

        <HeroSection />
        <BottomBar />
      </section>
    </>
  );
}

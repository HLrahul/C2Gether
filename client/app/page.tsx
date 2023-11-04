import { nanoid } from "nanoid"

import BottomBar from "@/components/BottomBar";
import HeroSection from "@/components/HeroSection";
import CreateRoomButton from "@/components/CreateRoom";

export default function Home() {
	const roomId = nanoid();

  return (
    <section className="absolute  min-h-[90vh] w-full flex flex-col justify-between px-5 sm:px-0 md:px-0 lg:px-0">
      <div className="flex flex-col m-auto min-h-[30vh] sm:h-[30vh] md:h-[25vh] w-full sm:w-[100%] md:w-[70%] justify-end items-center gap-4">
        <h1 className="text-3xl md:text-5xl text-center">
          Spend Quality time with your colleagues and friends.
        </h1>
        <CreateRoomButton roomId={roomId} />
      </div>

      <HeroSection />

      <BottomBar /> 
    </section>
  );
}

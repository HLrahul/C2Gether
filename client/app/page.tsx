import { nanoid } from "nanoid"

import CreateRoomButton from "@/components/CreateRoom";

export default function Home() {
	const roomId = nanoid();

  return (
    <section className="absolute mt-[-10vh] h-[100vh] w-full flex flex-col px-5 sm:px-0 md:px-0 lg:px-0">
      <div className="flex flex-col m-auto h-full w-full sm:w-[100%] md:w-[70%] justify-center gap-4">
        <h1 className="text-3xl md:text-5xl">
          Spend Quality time with your colleagues and friends.
        </h1>
        <CreateRoomButton roomId={roomId} />
      </div>
    </section>
  );
}

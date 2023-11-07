import DisconnectedNote from "@/components/DisconnectedNote";
import VideoPlayer from "@/components/VideoPlayer";
import VideoSearchBar from "@/components/VideoSearchBar";

export default function RoomPage() {
  return (
    <>
      <DisconnectedNote />

      <section className="min-h-[90vh] w-full m-auto px-1">
        <div className="h-full w-full lg:w-[75%] m-auto p-5 flex flex-col gap-[2rem]">
          <VideoSearchBar />

          {/* <VideoPlayer /> */}
        </div>
      </section>
    </>
  );
}

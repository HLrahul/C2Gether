import VideoPlayer from "@/components/VideoPlayer";
import VideoDetails from "@/components/VideoDetails";
import VideoInputGroup from "@/components/VideoInputGroup";
import DisconnectedNote from "@/components/DisconnectedNote";

export default function RoomPage() {
  return (
    <>
      <DisconnectedNote />

      <section className="min-h-full w-full m-auto px-1">
        <div className="grid grid-rows-5 grid-cols-8 lg:w-[75%] gap-5 m-auto p-5">
          <VideoInputGroup />

          <VideoPlayer />
          <VideoDetails />
        </div>
      </section>
    </>
  );
}

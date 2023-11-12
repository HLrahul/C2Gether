import VideoSearchBar from "@/components/VideoSearchBar";
import DisconnectedNote from "@/components/DisconnectedNote";

export default function RoomPage() {
  return (
    <>
      <DisconnectedNote />

      <section className="min-h-[90vh] w-full m-auto px-1">
        <div className="grid grid-rows-6 grid-cols-8 lg:w-[75%] gap-5 h-auto m-auto p-5">
          <VideoSearchBar />
        </div>
      </section>
    </>
  );
}

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <div>
        <main className="h-full w-full m-auto">{children}</main>

        <Sidebar />
      </div>
    </>
  );
}

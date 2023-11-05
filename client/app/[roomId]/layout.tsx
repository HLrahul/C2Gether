import Header from "@/components/Header";
import RightPanel from "@/components/RightPanel";


export default function RoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <div className="h-[calc(100vh-3.8rem)] lg:grid lg:grid-cols-[minmax(0,1fr)_15.5rem]">
        <main className="h-full">{children}</main>

        <RightPanel />
      </div>
    </>
  );
}
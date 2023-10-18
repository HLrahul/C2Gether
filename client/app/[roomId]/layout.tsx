import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";

export default function RoomLayout ({ children, }: { children: React.ReactNode }) {
    return (
      <>
        <Header />

        <main>{children}</main>

        <Sidebar />
      </>
    );
}
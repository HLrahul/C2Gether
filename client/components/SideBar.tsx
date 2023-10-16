import MemberList from "@/components/MemberList";
import LeaveButton from "@/components/LeaveButton";
import ThemeMenuButton from "./ThemeMenuButton";

export default function Sidebar() {
  return (
    <aside className="hidden border-l px-6 py-8 lg:block">
      <div className="relative flex h-full w-[12.5rem] flex-col gap-6">
        <ThemeMenuButton />

        <MemberList />

        <LeaveButton />
      </div>
    </aside>
  );
}

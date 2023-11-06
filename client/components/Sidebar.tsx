import MemberList from "@/components/MembersList";
import LeaveButton from "@/components/LeaveButton";

export default function Sidebar() {
  return (
    <aside className="hidden border-l px-6 py-8">
      <div className="relative flex h-full w-[12.5rem] flex-col gap-6">
        <MemberList />

        <LeaveButton />
      </div>
    </aside>
  );
}

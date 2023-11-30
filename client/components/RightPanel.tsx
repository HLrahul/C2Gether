import LeaveButton from "./LeaveButton";
import MembersList from "./MembersList";
import InviteMembersButton from "./InviteMemmbersButton";

export default function RightPanel() {
  return (
    <div className="flex h-full justify-center py-8">
      <div className="relative flex h-full w-[12.5rem] flex-col">
        <InviteMembersButton />
        <MembersList />
        <LeaveButton />
      </div>
    </div>
  );
}

import LeaveButton from "./LeaveButton";
import MembersList from "./MembersList";

export default function RightPanel () {

    return (
      <div className="flex h-full justify-center py-8">
        <div className="relative flex h-full w-[12.5rem] flex-col gap-6">
          <MembersList />

          <LeaveButton />
        </div>
      </div>
    );
}
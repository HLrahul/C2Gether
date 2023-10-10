import DisconnectedDialog from "@/components/Disconnected"
import LeaveButton from "@/components/LeaveButton"
import MemberList from "@/components/MemberList"

export default function RoomPage () {
    return (
        <div>
            <DisconnectedDialog />

            <h1>Room Page</h1>

            <MemberList />
            <LeaveButton />
        </div>
    )
}
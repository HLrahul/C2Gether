import ThemeMenuButton from "@/components/ThemeMenuButton";
import CreateRoomForm from "@/components/CreateRoomForm";

import { nanoid } from "nanoid";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import JoinRoomButtoon from "@/components/JoinRoomButton";


export default function Home() {

  const roomId = nanoid();

  return (
    <div className="flex h-screen flex-col items-center justify-between pb-5 pt-[13vh]">
      <ThemeMenuButton className="fixed right-[5vw] top-5 flex-1 md:right-5" />

      <Card className="w-[90vw] max-w-[400px]">
        <CardHeader>
          <CardTitle>Collab Study</CardTitle>
          <CardDescription>
            Productive time with Friends and Colleagues
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col space-y-4">
          <CreateRoomForm roomId={roomId} />

          <div className="flex items-center space-x-2">
            <Separator className="w-[45%]" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="w-[45%]" />
          </div>

          <JoinRoomButtoon />
        </CardContent>
      </Card>
    </div>
  );
}

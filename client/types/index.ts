import { User } from "@/store/userStore";
import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Notification {
  title: string;
  message: string;
}

export interface RoomJoinedData {
  user: User;
  roomId: string;
  members: User[];
}
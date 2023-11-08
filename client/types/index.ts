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

export interface Item {
  kind: any;
  etag: any;
  id: any;
  snippet: {
    publishedAt: any;
    channelId: any;
    title: any;
    description: any;
    thumbnails: any;
    channelTitle: any;
    liveBroadcastContent: any;
    publishTime: any;
  };
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: any; // replace 'any' with the actual type
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface Video {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}


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

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface Id {
  kind: string;
  videoId: string;
}


export interface Statistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface Item {
  kind: any;
  etag: any;
  id: any;
  snippet: Snippet;
  statistics: Statistics;
  channelLogo: string;
}

export interface Video {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
  statistics: Statistics;
  channelLogo: string;
}


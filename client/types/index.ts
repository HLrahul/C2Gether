import { SVGProps } from "react";
import { User } from "@/store/userStore";

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
  playlistId?: string;
}

export interface Video {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
  duration: string;
  channelLogo: string;
}

export interface VideoDetailsType {
  title: string;
  description: string;
  channelId: string;
  thumbnails: {
    default: {
      url: string;
    };
  };
  channelTitle: string;
}

export interface PlaylistVideo {
  snippet: {
    resourceId: {
      videoId: string;
    };
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

export interface ChannelDetailsType {
  title: string;
  thumbnails: {
    default: {
      url: string;
    };
  };
}
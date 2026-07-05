import * as z from 'zod';

export const isServerUrlSchema = z.object({
  roomId: z.string().min(1),
  serverUrl: z.string().url(),
});

export const playerStateSchema = z.object({
  roomId: z.string().min(1),
  currentTime: z.number().min(0),
  serverUrl: z.string().url(),
});

export const playerSeekSchema = z.object({
  roomId: z.string().min(1),
  currentTime: z.number().min(0),
});

export const playerPauseSchema = z.object({
  roomId: z.string().min(1),
  membersCurrentTime: z.number().min(0),
});

export const playbackRateSchema = z.object({
  roomId: z.string().min(1),
  playbackRate: z.number().positive(),
});

export const liveChatSchema = z.object({
  roomId: z.string().min(1),
  username: z.string().min(1).max(50),
  message: z.string().min(1).max(500),
  timeSent: z.string(),
});

export const actionMessageSchema = z.object({
  roomId: z.string().min(1),
  name: z.string().min(1).max(50),
  message: z.string().min(1).max(100),
  timeSent: z.string(),
});

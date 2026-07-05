import { Server, Socket } from 'socket.io';

import { createRoomData, deleteRoomData, getRoom } from '../data/room';
import { getRoomMembers } from '../data/user';
import * as schemas from '../lib/validations/socketPayloads';
import { JoinRoomData } from '../types';
import { clearSocketRateLimits, socketRateLimiter } from './rateLimiter';
import { joinRoom, leaveRoom } from './room';
import { validateJoinRoomData } from './validation';

export function handleSocketEvents(socket: Socket, io: Server) {
  function isRoomCreated(roomId: string) {
    const rooms = [...io.sockets.adapter.rooms];
    return rooms?.some((room) => room[0] === roomId);
  }

  socket.on('create-room', async (joinRoomData: JoinRoomData) => {
    const validatedData = validateJoinRoomData(socket, joinRoomData);

    if (!validatedData) return;
    const { roomId, username, password } = validatedData;
    createRoomData(roomId, password);
    joinRoom(socket, roomId, username);
  });

  socket.on('join-room', (joinRoomData: JoinRoomData) => {
    const validatedData = validateJoinRoomData(socket, joinRoomData);

    if (!validatedData) return;
    const { roomId, username, password } = validatedData;

    if (isRoomCreated(roomId)) {
      const room = getRoom(roomId);
      if (room && room.password && room.password !== password) {
        return socket.emit('invalid-data', {
          message: 'Incorrect password. Please try again.',
        });
      }
      return joinRoom(socket, roomId, username);
    }
    socket.emit('room-not-found', {
      message:
        "Oops! The Room ID you entered doesn't exist or hasn't been created yet.",
    });
  });

  socket.on('client-ready', (roomId: string) => {
    const members = getRoomMembers(roomId);

    if (members.length === 1) return socket.emit('client-loaded');
    const adminMember = members[0];

    if (!adminMember) return;
    socket.to(adminMember.id).emit('get-player-state');
  });

  socket.on(
    'is-admin',
    ({ roomId, userId }: { roomId: string; userId: string }) => {
      const members = getRoomMembers(roomId);

      if (members[0]?.id === userId) return socket.emit('admin-user', true);
      else return socket.emit('admin-user', false);
    },
  );

  socket.on('send-player-state', (data: any) => {
    const parsed = schemas.playerStateSchema.safeParse(data);

    if (!parsed.success) return;
    const { roomId, currentTime, serverUrl } = parsed.data;
    const members = getRoomMembers(roomId);
    const lastMember = members[members.length - 1];

    if (!lastMember) return;
    socket
      .to(lastMember.id)
      .emit('player-state-from-server', { serverUrl, currentTime });
    socket.to(lastMember.id).emit('client-loaded');
  });

  socket.on('player-play', (data: any) => {
    if (!data?.roomId) return;
    socket.broadcast.to(data.roomId).emit('player-play-from-server');
  });

  socket.on('player-pause', (data: any) => {
    const parsed = schemas.playerPauseSchema.safeParse(data);

    if (!parsed.success) return;
    const { roomId, membersCurrentTime } = parsed.data;
    socket.broadcast
      .to(roomId)
      .emit('player-pause-from-server', membersCurrentTime);
  });

  socket.on('player-seek', (data: any) => {
    if (!socketRateLimiter(socket, 'player-seek', 10, 5000)) return;
    const parsed = schemas.playerSeekSchema.safeParse(data);

    if (!parsed.success) return;
    socket.broadcast
      .to(parsed.data.roomId)
      .emit('player-seek-from-server', parsed.data.currentTime);
  });

  socket.on('playback-rate-change', (data: any) => {
    const parsed = schemas.playbackRateSchema.safeParse(data);
    if (!parsed.success) return;
    socket.broadcast
      .to(parsed.data.roomId)
      .emit('playback-rate-change-from-server', parsed.data.playbackRate);
  });

  socket.on('video-change', (data: any) => {
    if (!socketRateLimiter(socket, 'video-change', 5, 10000)) return;
    const parsed = schemas.isServerUrlSchema.safeParse(data);

    if (!parsed.success) return;
    socket.broadcast
      .to(parsed.data.roomId)
      .emit('video-change-from-server', { serverUrl: parsed.data.serverUrl });
  });

  socket.on('live-chat-text', (data: any) => {
    if (!socketRateLimiter(socket, 'live-chat-text', 20, 10000)) return;
    const parsed = schemas.liveChatSchema.safeParse(data);

    if (!parsed.success) return;
    const { roomId, username, message, timeSent } = parsed.data;
    socket.broadcast.to(roomId).emit('live-chat-text-from-server', {
      username,
      message,
      timeSent,
      isAction: false,
    });
  });

  socket.on('action-message', (data: any) => {
    const parsed = schemas.actionMessageSchema.safeParse(data);

    if (!parsed.success) return;
    const { roomId, name, message, timeSent } = parsed.data;
    socket.broadcast.to(roomId).emit('action-message-from-server', {
      username: name,
      message,
      timeSent,
      isAction: true,
    });
  });

  socket.on('leave-room', () => {
    leaveRoom(socket);
  });

  socket.on('disconnect', () => {
    clearSocketRateLimits(socket.id);
    socket.emit('disconnected');
    leaveRoom(socket);
  });
}

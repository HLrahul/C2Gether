import { JoinRoomData } from "../types";
import { Server, Socket } from "socket.io";
import { joinRoom, leaveRoom } from "./room";
import { getRoomMembers } from "../data/user";
import { validateJoinRoomData } from "./validation";

export function handleSocketEvents(socket: Socket, io: Server) {
  function isRoomCreated(roomId: string) {
    const rooms = [...io.sockets.adapter.rooms];
    return rooms?.some((room) => room[0] === roomId);
  }

  socket.on("create-room", async (joinRoomData: JoinRoomData) => {
    const validatedData = validateJoinRoomData(socket, joinRoomData);
    if (!validatedData) return;
    const { roomId, username } = validatedData;
    joinRoom(socket, roomId, username);
  });

  socket.on("join-room", (joinRoomData: JoinRoomData) => {
    const validatedData = validateJoinRoomData(socket, joinRoomData);
    if (!validatedData) return;
    const { roomId, username } = validatedData;
    if (isRoomCreated(roomId)) {
      return joinRoom(socket, roomId, username);
    }
    socket.emit("room-not-found", {
      message:
        "Oops! The Room ID you entered doesn't exist or hasn't been created yet.",
    });
  });

  socket.on("client-ready", (roomId: string) => {
    const members = getRoomMembers(roomId);
    if (members.length === 1) return socket.emit("client-loaded");
    const adminMember = members[0];
    if (!adminMember) return;
    socket.to(adminMember.id).emit("get-player-state");
  });

  socket.on(
    "is-admin",
    ({ roomId, userId }: { roomId: string; userId: string }) => {
      const members = getRoomMembers(roomId);
      if (members[0]?.id === userId) return socket.emit("admin-user", true);
      else return socket.emit("admin-user", false);
    }
  );

  socket.on(
    "send-player-state",
    ({
      roomId,
      currentTime,
      serverUrl,
    }: {
      roomId: string;
      currentTime: number;
      serverUrl: string;
    }) => {
      const members = getRoomMembers(roomId);
      const lastMember = members[members.length - 1];
      if (!lastMember) return;
      socket
        .to(lastMember.id)
        .emit("player-state-from-server", { serverUrl, currentTime });
      socket.to(lastMember.id).emit("client-loaded");
    }
  );

  socket.on("player-play", ({ roomId }: { roomId: string }) => {
    socket.broadcast.to(roomId).emit("player-play-from-server");
  });

  socket.on(
    "player-pause",
    ({
      roomId,
      membersCurrentTime,
    }: {
      roomId: string;
      membersCurrentTime: number;
    }) => {
      socket.broadcast
        .to(roomId)
        .emit("player-pause-from-server", membersCurrentTime);
    }
  );

  socket.on(
    "player-seek",
    ({ roomId, currentTime }: { roomId: string; currentTime: number }) => {
      socket.broadcast.to(roomId).emit("player-seek-from-server", currentTime);
    }
  );

  socket.on(
    "playback-rate-change",
    ({ roomId, playbackRate }: { roomId: string; playbackRate: number }) => {
      socket.broadcast
        .to(roomId)
        .emit("playback-rate-change-from-server", playbackRate);
    }
  );

  socket.on(
    "video-change",
    ({ roomId, serverUrl }: { roomId: string; serverUrl: string }) => {
      socket.broadcast
        .to(roomId)
        .emit("video-change-from-server", { serverUrl });
    }
  );

  socket.on(
    "live-chat-text",
    ({
      roomId,
      username,
      message,
      timeSent,
      timeZone,
    }: {
      roomId: string;
      username: string;
      message: string;
      timeSent: string;
      timeZone: string;
    }) => {
      socket.broadcast.to(roomId).emit("live-chat-text-from-server", {
        username,
        message,
        timeSent,
        timeZone,
      });
    }
  );

  socket.on("leave-room", () => {
    leaveRoom(socket);
  });

  socket.on("disconnect", () => {
    socket.emit("disconnected");
    leaveRoom(socket);
  });
}

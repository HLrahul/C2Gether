import cors from "cors";
import http from "http";
import express from "express";

import { strictObject, z } from "zod";
import { Server, type Socket } from "socket.io";

import { JoinRoomData } from "./types";
import { joinRoomSchema } from "./lib/validations/joinRoom";
import { addUser, getUser, removeUser, getRoomMembers } from "./data/user";

// Create app instance and add configuration
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
const server = http.createServer(app);

// UserDefined Functions
function isRoomCreated(roomId: string) {
  const rooms = [...io.sockets.adapter.rooms];
  return rooms?.some((room) => room[0] === roomId);
}

function validateJoinRoomData(socket: Socket, joinRoomData: JoinRoomData) {
  try {
    return joinRoomSchema.parse(joinRoomData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      socket.emit("invalid-data", {
        message:
          "The entities you provided are not correct and cannot be processed.",
      });
    }
  }
}

function joinRoom(socket: Socket, roomId: string, username: string) {
  socket.join(roomId);
  const user = {
    id: socket.id,
    username,
  };
  addUser({ ...user, roomId });
  const members = getRoomMembers(roomId);

  socket.emit("room-joined", { user, roomId, members });

  socket.to(roomId).emit("update-members", members);
  socket.to(roomId).emit("send-notification", {
    title: "New member arrived!",
    message: `${username} joined the party.`,
  });
}

function leaveRoom(socket: Socket) {
  const user = getUser(socket.id);
  if (!user) return;

  const { username, roomId } = user;

  removeUser(socket.id);
  const members = getRoomMembers(roomId);

  socket.to(roomId).emit("update-members", members);
  socket.to(roomId).emit("send-notification", {
    title: "Member departure!",
    message: `${username} left the party.`,
  });
  socket.leave(roomId);
}

// Create a socket.io server instance
const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("create-room", (joinRoomData: JoinRoomData) => {
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

  socket.on("is-admin", ({ roomId, userId }: { roomId: string, userId: string }) => {
    const members = getRoomMembers(roomId);

    if (members[0].id === userId) return socket.emit("admin-user", true);
    else return socket.emit("admin-user", false);
  })

  socket.on(
    "send-player-state",
    ({
      roomId,
      videoId,
      currentTime,
    }: {
      roomId: string;
      videoId: string;
      currentTime: number;
    }) => {
      const members = getRoomMembers(roomId);
      const lastMember = members[members.length - 1];

      if (!lastMember) return;
      socket
        .to(lastMember.id)
        .emit("player-state-from-server", { videoId, currentTime });
      socket.to(lastMember.id).emit("client-loaded");
    }
  );

  socket.on("player-play", ({ roomId }: { roomId: string }) => {
    socket.to(roomId).emit("player-play-from-server");
  });

  socket.on(
    "player-pause",
    ({ roomId, currentTime }: { roomId: string; currentTime: number }) => {
      socket.to(roomId).emit("player-pause-from-server", currentTime);
    }
  );

  socket.on(
    "video-change",
    ({ roomId, videoId }: { roomId: string; videoId: string }) => {
      socket.to(roomId).emit("video-change-from-server", videoId);
    }
  );

  socket.on("leave-room", () => {
    leaveRoom(socket);
  });

  socket.on("disconnect", () => {
    socket.emit("disconnected");
    leaveRoom(socket);
  });
});

// Start the Server with the PORT number from the .env file or 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

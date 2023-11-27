import { Socket } from "socket.io";
import { addUser, getUser, removeUser, getRoomMembers } from "../data/user";

export function joinRoom(socket: Socket, roomId: string, username: string) {
  socket.join(roomId);
  const user = { id: socket.id, username };
  addUser({ ...user, roomId });
  const members = getRoomMembers(roomId);
  socket.emit("room-joined", { user, roomId, members });
  socket.to(roomId).emit("update-members", members);
  socket.to(roomId).emit("send-notification", {
    title: "New member arrived!",
    message: `${username} joined the party.`,
  });
}

export function leaveRoom(socket: Socket) {
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
  socket.to(members[0]?.id).emit("admin-user", true);
}

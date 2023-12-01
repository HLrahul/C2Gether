"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocketEvents = void 0;
const room_1 = require("./room");
const user_1 = require("../data/user");
const validation_1 = require("./validation");
function handleSocketEvents(socket, io) {
    function isRoomCreated(roomId) {
        const rooms = [...io.sockets.adapter.rooms];
        return rooms === null || rooms === void 0 ? void 0 : rooms.some((room) => room[0] === roomId);
    }
    socket.on("create-room", (joinRoomData) => __awaiter(this, void 0, void 0, function* () {
        const validatedData = (0, validation_1.validateJoinRoomData)(socket, joinRoomData);
        if (!validatedData)
            return;
        const { roomId, username } = validatedData;
        (0, room_1.joinRoom)(socket, roomId, username);
    }));
    socket.on("join-room", (joinRoomData) => {
        const validatedData = (0, validation_1.validateJoinRoomData)(socket, joinRoomData);
        if (!validatedData)
            return;
        const { roomId, username } = validatedData;
        if (isRoomCreated(roomId)) {
            return (0, room_1.joinRoom)(socket, roomId, username);
        }
        socket.emit("room-not-found", {
            message: "Oops! The Room ID you entered doesn't exist or hasn't been created yet.",
        });
    });
    socket.on("client-ready", (roomId) => {
        const members = (0, user_1.getRoomMembers)(roomId);
        if (members.length === 1)
            return socket.emit("client-loaded");
        const adminMember = members[0];
        if (!adminMember)
            return;
        socket.to(adminMember.id).emit("get-player-state");
    });
    socket.on("is-admin", ({ roomId, userId }) => {
        var _a;
        const members = (0, user_1.getRoomMembers)(roomId);
        if (((_a = members[0]) === null || _a === void 0 ? void 0 : _a.id) === userId)
            return socket.emit("admin-user", true);
        else
            return socket.emit("admin-user", false);
    });
    socket.on("send-player-state", ({ roomId, currentTime, serverUrl, }) => {
        const members = (0, user_1.getRoomMembers)(roomId);
        const lastMember = members[members.length - 1];
        if (!lastMember)
            return;
        socket
            .to(lastMember.id)
            .emit("player-state-from-server", { serverUrl, currentTime });
        socket.to(lastMember.id).emit("client-loaded");
    });
    socket.on("player-play", ({ roomId }) => {
        socket.broadcast.to(roomId).emit("player-play-from-server");
    });
    socket.on("player-pause", ({ roomId, membersCurrentTime, }) => {
        socket.broadcast
            .to(roomId)
            .emit("player-pause-from-server", membersCurrentTime);
    });
    socket.on("player-seek", ({ roomId, currentTime }) => {
        socket.broadcast.to(roomId).emit("player-seek-from-server", currentTime);
    });
    socket.on("playback-rate-change", ({ roomId, playbackRate }) => {
        socket.broadcast
            .to(roomId)
            .emit("playback-rate-change-from-server", playbackRate);
    });
    socket.on("video-change", ({ roomId, serverUrl }) => {
        socket.broadcast
            .to(roomId)
            .emit("video-change-from-server", { serverUrl });
    });
    socket.on("live-chat-text", ({ roomId, username, message, timeSent, timeZone, }) => {
        socket.broadcast.to(roomId).emit("live-chat-text-from-server", {
            username,
            message,
            timeSent,
            timeZone,
        });
    });
    socket.on("leave-room", () => {
        (0, room_1.leaveRoom)(socket);
    });
    socket.on("disconnect", () => {
        socket.emit("disconnected");
        (0, room_1.leaveRoom)(socket);
    });
}
exports.handleSocketEvents = handleSocketEvents;

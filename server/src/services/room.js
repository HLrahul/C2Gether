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
exports.leaveRoom = exports.joinRoom = void 0;
const user_1 = require("../data/user");
function joinRoom(socket, roomId, username) {
    return __awaiter(this, void 0, void 0, function* () {
        socket.join(roomId);
        const user = { id: socket.id, username };
        (0, user_1.addUser)(Object.assign(Object.assign({}, user), { roomId }));
        const members = (0, user_1.getRoomMembers)(roomId);
        socket.emit("room-joined", { user, roomId, members });
        socket.to(roomId).emit("update-members", members);
        socket.to(roomId).emit("send-notification", {
            title: "New member arrived!",
            message: `${username} joined the party.`,
        });
    });
}
exports.joinRoom = joinRoom;
function leaveRoom(socket) {
    var _a;
    const user = (0, user_1.getUser)(socket.id);
    if (!user)
        return;
    const { username, roomId } = user;
    (0, user_1.removeUser)(socket.id);
    const members = (0, user_1.getRoomMembers)(roomId);
    socket.to(roomId).emit("update-members", members);
    socket.to(roomId).emit("send-notification", {
        title: "Member departure!",
        message: `${username} left the party.`,
    });
    socket.leave(roomId);
    socket.to((_a = members[0]) === null || _a === void 0 ? void 0 : _a.id).emit("admin-user", true);
}
exports.leaveRoom = leaveRoom;

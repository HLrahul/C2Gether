"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.worker = void 0;
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const mediasoup_1 = require("mediasoup");
const socket_io_1 = require("socket.io");
const socketEvents_1 = require("./services/socketEvents");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://probable-goggles-wjrjjj5qvwph9jqv-3000.app.github.dev/",
    methods: ["GET", "POST"],
    credentials: true,
}));
const server = http_1.default.createServer(app);
(0, mediasoup_1.createWorker)({ logLevel: 'warn' }).then((w) => { exports.worker = w; });
const io = new socket_io_1.Server(server);
io.on("connection", (socket) => {
    (0, socketEvents_1.handleSocketEvents)(socket, io);
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

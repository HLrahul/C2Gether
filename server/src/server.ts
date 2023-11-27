import cors from "cors";
import http from "http";
import express from "express";
import { Server } from "socket.io";
import { handleSocketEvents } from "./services/socketEvents";

const app = express();
app.use(
  cors({
    origin: "https://probable-goggles-wjrjjj5qvwph9jqv-3000.app.github.dev/",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
const server = http.createServer(app);

const io = new Server(server);
io.on("connection", (socket) => {
  handleSocketEvents(socket, io);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import { io } from "socket.io-client";

const SERVER =
  process.env.NODE_ENV === "production"
    ? ""
    : "https://probable-goggles-wjrjjj5qvwph9jqv-3001.app.github.dev/";

export const socket = io(SERVER, { transports: ["websocket"] });

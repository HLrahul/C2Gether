import { io } from "socket.io-client";

const SERVER =
  process.env.NODE_ENV === "production"
    ? "https://scribble-production-d6c0.up.railway.app"
    : "http://127.0.0.1:3001";

export const socket = io(SERVER, { transports: ["websocket"] });

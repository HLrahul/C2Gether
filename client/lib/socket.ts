import { io } from "socket.io-client";

const SERVER =
  process.env.NODE_ENV === "production"
    ? ""
    : "http://127.0.01:3001";

export const socket = io(SERVER, { transports: ["websocket"] });

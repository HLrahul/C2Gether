import { io } from "socket.io-client";

const SERVER =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}`
    : "https://c2gether-socket-server.onrender.com/";

export const socket = io(SERVER, { transports: ["websocket"] });

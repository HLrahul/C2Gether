import { io } from "socket.io-client";

const SERVER =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}`
    : "https://collab-study-server-d5vfg1pkq-hlrahul.vercel.app";

export const socket = io(SERVER, { transports: ["websocket"] });

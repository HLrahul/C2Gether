import { io } from "socket.io-client";

const SERVER =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}`
    : "https://probable-goggles-wjrjjj5qvwph9jqv-3001.app.github.dev/";

export const socket = io(SERVER, { transports: ["websocket"] });

import { io } from "socket.io-client";

const SERVER =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? "https://main--tourmaline-hamster-ff51f8.netlify.app/"
    : "https://probable-goggles-wjrjjj5qvwph9jqv-3001.app.github.dev/";

export const socket = io(SERVER, { transports: ["websocket"] });

import { io } from 'socket.io-client';

// const SERVER =
//   process.env.NODE_ENV === "production"
//     ? ""
//     : "https://urban-space-robot-qg7ggg45vpqcxr9v-3001.app.github.dev/";

export const socket = io(
  "https://urban-space-robot-qg7ggg45vpqcxr9v-3001.app.github.dev/",
  { transports: ["websocket"] }
);
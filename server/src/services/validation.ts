import * as z from "zod";
import { Socket } from "socket.io";
import { JoinRoomData } from "../types";
import { joinRoomSchema } from "../lib/validations/joinRoom";

export function validateJoinRoomData(
  socket: Socket,
  joinRoomData: JoinRoomData
) {
  try {
    return joinRoomSchema.parse(joinRoomData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      socket.emit("invalid-data", {
        message:
          "The entities you provided are not correct and cannot be processed.",
      });
    }
  }
}

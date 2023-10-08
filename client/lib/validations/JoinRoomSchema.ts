import * as z from 'zod';

export const joinRoomSchema = z.object({
    username: z.string()
    .min(3, "Username must atleast contain 3 characters")
    .max(20, "Username must be less than 20 characters"),
    roomId: z.string().trim().length(22, "Room ID must exactly 22 characters"),
})
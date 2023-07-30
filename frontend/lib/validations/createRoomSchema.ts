import z from 'zod'

export const createRoomSchema = z.object({
  username: z
    .string()
    .min(3, "Username must atleast contain 3 characters")
    .max(20, "Username must be less than 20 characters"),
});
import * as z from "zod";

export const liveChatTextSchema = z.object({
  text: z.string().min(1).max(1000),
});
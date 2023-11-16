import * as z from "zod";

export const searchKeywordSchema = z.object({
  keyword: z.string().min(1, "Keyword must be at least 1 character long"),
});
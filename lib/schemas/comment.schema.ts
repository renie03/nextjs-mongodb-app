import { z } from "zod";

export const commentSchema = z.object({
  postId: z.string(),
  desc: z.string().trim().min(1, { message: "Desc is required" }),
});

export const updateCommentSchema = z.object({
  desc: z.string().trim().min(1, { message: "Desc is required" }),
});

import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  desc: z
    .string()
    .trim()
    .min(5, { message: "Desc must be at least 5 characters" })
    .max(300, { message: "Desc must be at most 300 characters" }),
  category: z.string().min(1, "Category is required"),
  img: z.string().nullable().optional(),
  isFeatured: z.boolean(),
});

export type PostInputs = z.infer<typeof postSchema>;

export const updatePostSchema = postSchema.partial().extend({
  id: z.string(),
});

export type UpdatePostInputs = z.infer<typeof updatePostSchema>;

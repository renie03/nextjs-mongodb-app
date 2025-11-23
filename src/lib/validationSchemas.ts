import { z } from "zod";

// ----------------- AUTH SCHEMAS -----------------
export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(20, { message: "Username must be at most 20 characters long" }),
    email: z.email({ message: "Invalid email address" }),
    name: z
      .string()
      .trim()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(20, { message: "Name must be at most 20 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number" }),
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: "Contain at least one special character",
    // })
    confirmPassword: z.string(),
    image: z.string().nullable().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormInputs = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
    .regex(/[0-9]/, { message: "Contain at least one number" }),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

export const updateUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .optional(),
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
    .regex(/[0-9]/, { message: "Contain at least one number" })
    .optional()
    .or(z.literal("")),
  image: z.string().nullable().optional(),
});

export type UpdateUserFormInputs = z.infer<typeof updateUserSchema>;

// ----------------- USER SCHEMAS -----------------
export const userSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" }),
  email: z.email({ message: "Invalid email address" }),
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
    .regex(/[0-9]/, { message: "Contain at least one number" }),
  image: z.string().nullable().optional(),
  isAdmin: z.enum(["true", "false"]),
});

export type UserFormInputs = z.infer<typeof userSchema>;

export const adminUpdateUserSchema = z.object({
  id: z.string(),
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .optional(),
  email: z.email({ message: "Invalid email address" }).optional(),
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
    .regex(/[0-9]/, { message: "Contain at least one number" })
    .optional()
    .or(z.literal("")),
  image: z.string().nullable().optional(),
  isAdmin: z.enum(["true", "false"]).optional(),
});

export type AdminUpdateUserFormInputs = z.infer<typeof adminUpdateUserSchema>;

// ----------------- POST SCHEMAS -----------------
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
  category: z.enum(["general", "technology", "health", "sports", "education"], {
    message: "Category is required",
  }),
  isFeatured: z.enum(["true", "false"]),
  img: z.string().nullable().optional(),
});

export type PostFormInputs = z.infer<typeof postSchema>;

export const updatePostSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .trim()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be at most 100 characters" })
    .optional(),
  desc: z
    .string()
    .trim()
    .min(5, { message: "Desc must be at least 5 characters" })
    .max(300, { message: "Desc must be at most 300 characters" })
    .optional(),
  category: z
    .enum(["general", "technology", "health", "sports", "education"])
    .optional(),
  isFeatured: z.enum(["true", "false"]).optional(),
  img: z.string().nullable().optional(),
});

export type UpdatePostFormInputs = z.infer<typeof updatePostSchema>;

// ----------------- COMMENT SCHEMAS -----------------
export const commentSchema = z.object({
  postId: z.string(),
  desc: z.string().trim().min(1, { message: "Desc is required" }),
});

export const updateCommentSchema = z.object({
  desc: z.string().trim().min(1, { message: "Desc is required" }),
});

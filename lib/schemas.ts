import { z } from "zod";

// -- AUTH --
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

export type RegisterInputs = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z.string().trim().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginInputs = z.infer<typeof loginSchema>;

export const updateUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .optional()
    .or(z.literal("")),
  email: z
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),
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
    .regex(/[0-9]/, { message: "Contain at least one number" })
    .optional()
    .or(z.literal("")),
  image: z.string().nullable().optional(),
});

export type UpdateUserInputs = z.infer<typeof updateUserSchema>;

// -- POSTS --
export const postSchema = z.object({
  id: z.string().optional(),
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

// -- USERS --
export const adminCreateUserSchema = z.object({
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
  isAdmin: z.boolean(),
});

export type AdminCreateUserInputs = z.infer<typeof adminCreateUserSchema>;

export const adminUpdateUserSchema = z.object({
  id: z.string(),
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .optional()
    .or(z.literal("")),
  email: z
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),
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
    .regex(/[0-9]/, { message: "Contain at least one number" })
    .optional()
    .or(z.literal("")),
  image: z.string().nullable().optional(),
  isAdmin: z.boolean(),
});

export type AdminUpdateUserInputs = z.infer<typeof adminUpdateUserSchema>;

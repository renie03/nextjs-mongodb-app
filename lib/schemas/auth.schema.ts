import { z } from "zod";

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
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number" })
    .or(z.literal(""))
    .optional(),
  image: z.string().nullable().optional(),
});

export type UpdateUserInputs = z.infer<typeof updateUserSchema>;

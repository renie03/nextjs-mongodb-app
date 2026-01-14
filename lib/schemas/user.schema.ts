import { z } from "zod";

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
  isAdmin: z.boolean(),
});

export type UserInputs = z.infer<typeof userSchema>;

export const adminUpdateUserSchema = userSchema.partial().extend({
  id: z.string(),
  password: userSchema.shape.password.optional().or(z.literal("")),
});

export type AdminUpdateUserInputs = z.infer<typeof adminUpdateUserSchema>;

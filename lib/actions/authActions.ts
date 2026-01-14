"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import connectToDB from "../connectToDB";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import {
  LoginInputs,
  loginSchema,
  RegisterInputs,
  registerSchema,
  UpdateUserInputs,
  updateUserSchema,
} from "../schemas/auth.schema";
import { AuthError } from "next-auth";

export const googleLogin = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const githubLogin = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const logout = async (
  previousState: { success: boolean; message: string },
  formData: FormData
) => {
  try {
    await signOut({ redirect: false });
    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const register = async (
  previousState: { success: boolean; message?: string },
  formData: RegisterInputs
) => {
  const parsed = registerSchema.safeParse(formData);

  if (!parsed.success) {
    console.log(parsed.error.issues);
    return {
      success: false,
    };
  }

  const { username, email, name, password, image } = parsed.data;

  try {
    await connectToDB();

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return {
        success: false,
        message: "Username already exists",
      };
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      name,
      password: hashedPassword,
      image,
    });

    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    // return { success: true, message: "You have registered successfully." };
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const login = async (
  previousState: { success: boolean; message?: string },
  formData: LoginInputs
) => {
  const parsed = loginSchema.safeParse(formData);

  if (!parsed.success) {
    console.log(parsed.error.issues);
    return {
      success: false,
    };
  }

  const { username, password } = parsed.data;

  try {
    await signIn("credentials", { username, password, redirectTo: "/" });
    return { success: true };
    // await signIn("credentials", { username, password, redirect: false });
    // return { success: true, message: "Login successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Invalid Credentials",
          };
        default:
          return { success: false, message: "Something went wrong" };
      }
    }
    throw error;
  }
};

export const updateUser = async (
  previousState: { success: boolean; message?: string },
  formData: UpdateUserInputs
) => {
  const parsed = updateUserSchema.safeParse(formData);

  if (!parsed.success) {
    console.log(parsed.error.issues);
    return {
      success: false,
    };
  }

  const { username, email, name, password, image } = parsed.data;

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    await connectToDB();

    const existingUsername = await User.findOne({ username });
    if (existingUsername && existingUsername._id.toString() !== userId) {
      return {
        success: false,
        message: "Username is already taken",
      };
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== userId) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    const updateFields: {
      username?: string;
      email?: string;
      name?: string;
      password?: string;
      image?: string | null;
    } = {
      name,
      image,
    };

    if (username) {
      updateFields.username = username;
    }

    if (email) {
      updateFields.email = email;
    }

    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    await User.findByIdAndUpdate(userId, updateFields);

    return { success: true, message: "User has been updated" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

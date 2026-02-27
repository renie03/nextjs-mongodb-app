"use server";

import bcrypt from "bcryptjs";
import { auth } from "../auth";
import connectToDB from "../connectToDB";
import { User } from "../models/user.model";
import { Post } from "../models/post.model";
import { Comment } from "../models/comment.model";
import {
  AdminCreateUserInputs,
  adminCreateUserSchema,
  AdminUpdateUserInputs,
  adminUpdateUserSchema,
} from "../schemas";
import { revalidatePath } from "next/cache";

export const adminCreateUser = async (
  previousState: { success: boolean; message?: string },
  formData: AdminCreateUserInputs,
) => {
  const parsed = adminCreateUserSchema.safeParse(formData);

  if (!parsed.success) {
    console.log(parsed.error.issues);
    return {
      success: false,
    };
  }

  const { username, email, name, password, image, isAdmin } = parsed.data;

  const session = await auth();
  if (!session?.user?.isAdmin) {
    return {
      success: false,
      message: "Admin only",
    };
  }

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
      isAdmin,
    });

    revalidatePath("/admin/users");

    return { success: true, message: "User has been created" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const adminUpdateUser = async (
  previousState: { success: boolean; message?: string },
  formData: AdminUpdateUserInputs,
) => {
  const parsed = adminUpdateUserSchema.safeParse(formData);

  if (!parsed.success) {
    console.log(parsed.error.issues);
    return {
      success: false,
    };
  }

  const { id, username, email, name, password, image, isAdmin } = parsed.data;

  const session = await auth();
  if (!session?.user?.isAdmin) {
    return {
      success: false,
      message: "Admin only",
    };
  }

  try {
    await connectToDB();

    const existingUsername = await User.findOne({ username });
    if (existingUsername && existingUsername._id.toString() !== id) {
      return {
        success: false,
        message: "Username is already taken",
      };
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== id) {
      return {
        success: false,
        message: "Email is already taken",
      };
    }

    const updateFields: {
      username?: string;
      email?: string;
      name?: string;
      password?: string;
      image?: string | null;
      isAdmin?: boolean;
    } = {
      name,
      image,
      isAdmin,
    };

    if (username) {
      updateFields.username = username;
    }

    if (email) {
      updateFields.email = email;
    }

    if (password && password.trim() !== "") {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    await User.findByIdAndUpdate(id, updateFields);

    revalidatePath("/admin/users");

    return { success: true, message: "User has been updated" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const deleteUser = async (
  previousState: { success: boolean; message: string },
  formData: FormData,
) => {
  const id = formData.get("id") as string;

  const session = await auth();
  if (!session?.user?.isAdmin) {
    return {
      success: false,
      message: "Admin only",
    };
  }

  if (!id) {
    return {
      success: false,
      message: "Invalid user ID",
    };
  }

  try {
    await connectToDB();

    await User.findByIdAndDelete(id);
    // Delete all posts and comments linked to this user
    await Post.deleteMany({ user: id });
    await Comment.deleteMany({ user: id });

    // revalidatePath("/admin/users");

    return { success: true, message: "User has been deleted" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

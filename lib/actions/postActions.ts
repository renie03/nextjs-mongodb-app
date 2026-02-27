"use server";

import connectToDB from "../connectToDB";
import { Post } from "../models/post.model";
import { Comment } from "../models/comment.model";
import { PostInputs, postSchema } from "../schemas";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export const createPost = async (
  previousState: { success: boolean; message?: string },
  formData: PostInputs,
) => {
  const parsed = postSchema.safeParse(formData);

  if (!parsed.success) {
    console.log(parsed.error.issues);
    return {
      success: false,
    };
  }

  const { title, desc, img, category, isFeatured } = parsed.data;

  const session = await auth();
  if (!session?.user?.isAdmin) {
    return {
      success: false,
      message: "Admin only",
    };
  }

  try {
    await connectToDB();

    const existingTitle = await Post.findOne({ title });
    if (existingTitle) {
      return {
        success: false,
        message: "Title already exists",
      };
    }

    await Post.create({
      user: session.user.id,
      title,
      desc,
      img,
      category,
      isFeatured,
    });

    revalidatePath("/admin/posts");

    return { success: true, message: "Post has been created" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const updatePost = async (
  previousState: { success: boolean; message?: string },
  formData: PostInputs,
) => {
  const parsed = postSchema.safeParse(formData);

  if (!parsed.success) {
    console.log(parsed.error.issues);
    return {
      success: false,
    };
  }

  const { id, title, desc, img, category, isFeatured } = parsed.data;

  const session = await auth();
  if (!session?.user?.isAdmin) {
    return {
      success: false,
      message: "Admin only",
    };
  }

  try {
    await connectToDB();

    const existingTitle = await Post.findOne({ title });
    if (existingTitle && existingTitle._id.toString() !== id) {
      return {
        success: false,
        message: "Title is already taken",
      };
    }

    await Post.findByIdAndUpdate(id, {
      title,
      desc,
      img,
      category,
      isFeatured,
    });

    revalidatePath("/admin/posts");

    return { success: true, message: "Post has been updated" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const deletePost = async (
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
      message: "Invalid post ID",
    };
  }

  try {
    await connectToDB();

    await Post.findByIdAndDelete(id);
    // Delete all comments linked to this post
    await Comment.deleteMany({ post: id });

    // revalidatePath("/admin/posts");

    return { success: true, message: "Post has been deleted" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

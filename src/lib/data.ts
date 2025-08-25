import connectToDB from "./connectToDB";
import { FilterQuery } from "mongoose";
import { IPost, Post } from "./models/post.model";
import { ITEM_PER_PAGE } from "./constants";

export const getPaginatedPosts = async (page?: number, search?: string) => {
  const currentPage = page || 1;

  try {
    await connectToDB();

    const query: FilterQuery<IPost> = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (currentPage - 1));

    const totalPosts = await Post.countDocuments(query);

    return { posts: JSON.parse(JSON.stringify(posts)), totalPosts };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts!");
  }
};

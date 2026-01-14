import connectToDB from "./connectToDB";
import { QueryFilter } from "mongoose";
import { Post, IPost } from "./models/post.model";
import { ITEM_PER_PAGE } from "./constants";
import { User } from "./models/user.model";

export const getPaginatedPosts = async (page?: number, search?: string) => {
  const currentPage = page || 1;

  try {
    await connectToDB();

    const query: QueryFilter<IPost> = {};

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

export const getPaginatedUsers = async (userId?: string) => {
  try {
    await connectToDB();

    const users = await User.find({ _id: { $ne: userId } }).sort({
      createdAt: -1,
    });

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
};

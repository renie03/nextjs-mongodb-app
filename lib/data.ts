import connectToDB from "./connectToDB";
import { QueryFilter } from "mongoose";
import { Post, IPost } from "./models/post.model";

export const getPaginatedPosts = async (search?: string) => {
  try {
    await connectToDB();

    const query: QueryFilter<IPost> = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const posts = await Post.find(query).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts!");
  }
};

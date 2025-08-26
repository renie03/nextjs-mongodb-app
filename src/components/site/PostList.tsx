import { getPosts } from "@/lib/data";
import Categories from "./Categories";
import PostItem from "./PostItem";

const PostList = async ({ category }: { category: string }) => {
  const posts = await getPosts(category);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Recent Posts</h1>
      <Categories />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
export default PostList;

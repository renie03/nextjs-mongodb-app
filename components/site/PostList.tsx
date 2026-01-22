import { getPosts } from "@/lib/data";
import PostItem from "./PostItem";

const PostList = async ({ category }: { category: string }) => {
  const posts = await getPosts(category);

  const emptyMessage = category
    ? `No posts found in ${category} category.`
    : "No posts available.";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {posts.length === 0 ? (
        <div className="h-64 flex items-center justify-center col-span-full text-textSoft font-semibold">
          {emptyMessage}
        </div>
      ) : (
        posts.map((post) => <PostItem key={post._id} post={post} />)
      )}
    </div>
  );
};

export default PostList;

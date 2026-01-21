import { getFeaturedPosts } from "@/lib/data";
import { PostType } from "@/types/types";
import PostItem from "./PostItem";

const FeaturedPosts = async () => {
  const posts: PostType[] = await getFeaturedPosts();

  return (
    <div className="mb-15">
      <h1 className="text-2xl font-bold mb-5">Featured Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-75">
        {posts.length === 0 ? (
          <div className="flex items-center justify-center col-span-full text-textSoft font-semibold">
            No featured posts available.
          </div>
        ) : (
          posts.map((post) => <PostItem key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default FeaturedPosts;

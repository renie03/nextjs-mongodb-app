import { getRelatedPosts } from "@/lib/data";
import PostItem from "./PostItem";
import { PostType } from "@/types/types";

const RelatedPosts = async ({
  category,
  postId,
}: {
  category: string;
  postId: string;
}) => {
  const posts: PostType[] = await getRelatedPosts(category, postId);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {posts.length === 0 ? (
        <div className="h-58 flex items-center justify-center col-span-full text-textSoft font-semibold">
          No related posts found.
        </div>
      ) : (
        posts.map((post) => <PostItem key={post._id} post={post} />)
      )}
    </div>
  );
};

export default RelatedPosts;

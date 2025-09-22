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
    <div>
      <h1 className="text-xl font-semibold mb-2">Related Post</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 min-h-[235px]">
        {posts.length === 0 ? (
          <div className="flex items-center justify-center col-span-full text-textSoft font-semibold">
            No related posts found.
          </div>
        ) : (
          posts.map((post) => <PostItem key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default RelatedPosts;

import { PostType } from "@/types/types";
import Pagination from "./Pagination";
import PostItem from "./PostItem";
import { getPaginatedPosts } from "@/lib/data";

const PaginatedPostList = async ({
  page,
  category,
  sort,
  q,
}: {
  page: number;
  category: string;
  sort: string;
  q?: string;
}) => {
  const { posts, totalPosts }: { posts: PostType[]; totalPosts: number } =
    await getPaginatedPosts(page, q, category, sort);

  const emptyMessage =
    q && category
      ? `No posts found for "${q}" in ${category} category.`
      : q
      ? `No posts found for "${q}".`
      : category
      ? `No posts found in ${category} category.`
      : "No posts available.";

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 min-h-[240px]">
        {posts.length === 0 ? (
          <div className="flex items-center justify-center col-span-full text-textSoft font-semibold">
            {emptyMessage}
          </div>
        ) : (
          posts.map((post) => <PostItem key={post._id} post={post} />)
        )}
      </div>
      <Pagination totalData={totalPosts} />
    </div>
  );
};

export default PaginatedPostList;

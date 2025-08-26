import { PostType } from "@/types/types";
import Filters from "./Filters";
import Pagination from "./Pagination";
import PostItem from "./PostItem";
import { getPaginatedPosts } from "@/lib/data";

const PaginatedPostList = async ({
  page,
  category,
  sort,
}: {
  page: number;
  category?: string;
  sort?: string;
}) => {
  const { posts, totalPosts }: { posts: PostType[]; totalPosts: number } =
    await getPaginatedPosts(page, undefined, category, sort);

  return (
    <div>
      <Filters />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
      <Pagination totalData={totalPosts} />
    </div>
  );
};
export default PaginatedPostList;

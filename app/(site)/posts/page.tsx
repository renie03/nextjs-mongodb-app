import { Suspense } from "react";
import Filters from "@/components/site/Filters";
import PaginatedPostList from "@/components/site/PaginatedPostList";
import PaginatedPostListSkeleton from "@/components/skeletons/PaginatedPostListSkeleton";

const PostsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    category?: string;
    sort?: string;
  }>;
}) => {
  const page = Number((await searchParams).page) || 1;
  const category = (await searchParams).category || "";
  const sort = (await searchParams).sort || "newest";

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-2">All Posts</h1>
      <Filters />
      <Suspense fallback={<PaginatedPostListSkeleton />}>
        <PaginatedPostList page={page} category={category} sort={sort} />
      </Suspense>
    </div>
  );
};

export default PostsPage;

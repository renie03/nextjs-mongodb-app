import { Suspense } from "react";
import Filters from "@/components/site/Filters";
import PaginatedPostList from "@/components/site/PaginatedPostList";

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
      <Filters />
      <Suspense
        fallback={
          <div className="h-64 flex items-center justify-center gap-2">
            <div className="spinner" />
            <span>Loading posts...</span>
          </div>
        }
      >
        <PaginatedPostList page={page} category={category} sort={sort} />
      </Suspense>
    </div>
  );
};

export default PostsPage;

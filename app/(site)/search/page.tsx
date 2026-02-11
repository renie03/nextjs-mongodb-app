import { Suspense } from "react";
import Filters from "@/components/site/Filters";
import PaginatedPostList from "@/components/site/PaginatedPostList";
import PaginatedPostListSkeleton from "@/components/skeletons/PaginatedPostListSkeleton";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    category?: string;
    sort?: string;
    q?: string;
  }>;
}) => {
  const page = Number((await searchParams).page) || 1;
  const category = (await searchParams).category || "";
  const sort = (await searchParams).sort || "newest";
  const q = (await searchParams).q || "";

  return (
    <div>
      <h1 className="text-2xl text-center mb-2">
        Search results for <b>{q}</b>
      </h1>
      <Filters />
      <Suspense fallback={<PaginatedPostListSkeleton />}>
        <PaginatedPostList page={page} category={category} sort={sort} q={q} />
      </Suspense>
    </div>
  );
};

export default SearchPage;

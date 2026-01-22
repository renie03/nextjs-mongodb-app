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
      <PaginatedPostList page={page} category={category} sort={sort} />
    </div>
  );
};

export default PostsPage;

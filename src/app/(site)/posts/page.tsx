import PaginatedPostList from "@/components/site/PaginatedPostList";

const PostPage = async ({
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
      <PaginatedPostList page={page} category={category} sort={sort} />a
    </div>
  );
};

export default PostPage;

import Test from "@/components/Test";

const TestPage = async ({
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

  console.log("test page", page, category, sort, q);

  return (
    <div className="flex items-center justify-center h-screen">
      <Test page={page} category={category} sort={sort} q={q} />
    </div>
  );
};

export default TestPage;

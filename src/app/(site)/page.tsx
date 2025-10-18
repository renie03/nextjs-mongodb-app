import FeaturedPosts from "@/components/site/FeaturedPosts";
import Categories from "@/components/site/Categories";
import PostList from "@/components/site/PostList";
import Link from "next/link";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const category = (await searchParams).category || "";

  return (
    <div>
      <FeaturedPosts />
      <div>
        <h1 className="text-2xl font-bold mb-5">Recent Posts</h1>
        <Categories />
        <PostList category={category} />
      </div>
      <div className="flex justify-end mt-4">
        <Link
          href={category ? `/posts/?category=${category}` : "/posts"}
          className="underline text-sm text-textSoft"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

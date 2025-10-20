import FeaturedPosts from "@/components/site/FeaturedPosts";
import Categories from "@/components/site/Categories";
import PostList from "@/components/site/PostList";
import Link from "next/link";
import Image from "next/image";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const category = (await searchParams).category || "";

  return (
    <div>
      <FeaturedPosts />
      <div className="flex flex-col border border-gray-200 rounded-t-xl">
        <Link href="/">
          <div className="relative aspect-[2/1]">
            <Image
              src="/1g.png"
              fill
              className="rounded-t-xl"
              alt=""
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </Link>
        <div className="p-5">
          <h1 className="text-lg font-medium mt-1">Title</h1>
          <div className="flex items-center justify-between">
            <h2>Category</h2>
            <span className="text-textSoft text-sm">1 day ago</span>
          </div>
        </div>
      </div>
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

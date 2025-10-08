import FeaturedPosts from "@/components/site/FeaturedPosts";
import Categories from "@/components/site/Categories";
import PostList from "@/components/site/PostList";
import Link from "next/link";
import Accept from "@/assets/image.png";
import Image from "next/image";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const category = (await searchParams).category || "";

  return (
    <div>
      <Image src={Accept} alt="" width={500} height={500} placeholder="blur" />
      <FeaturedPosts />
      <div>
        <h1 className="text-2xl font-bold mb-5">Recent Posts</h1>
        <Categories />
        <PostList category={category} />
      </div>
      <div className="flex justify-end">
        <Link
          href={category ? `/posts/?category=${category}` : "/posts"}
          className="mt-4 underline text-sm text-textSoft"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

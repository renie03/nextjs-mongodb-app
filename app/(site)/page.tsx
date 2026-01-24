import { Suspense } from "react";
import FeaturedPosts from "@/components/site/FeaturedPosts";
import Categories from "@/components/site/Categories";
import PostList from "@/components/site/PostList";
import Link from "next/link";
import PostItemSkeleton from "@/components/site/PostItemSkeleton";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const category = (await searchParams).category || "";

  return (
    <div>
      <div className="mb-15">
        <h1 className="text-2xl font-bold mb-5">Featured Posts</h1>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <PostItemSkeleton key={i} />
              ))}
            </div>
          }
        >
          <FeaturedPosts />
        </Suspense>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-5">Recent Posts</h1>
        <Categories />
        <Suspense
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <PostItemSkeleton key={i} />
              ))}
            </div>
          }
        >
          <PostList category={category} />
        </Suspense>
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
}

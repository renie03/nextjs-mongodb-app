import { Suspense } from "react";
import FeaturedPosts from "@/components/site/FeaturedPosts";
import Categories from "@/components/site/Categories";
import PostList from "@/components/site/PostList";
import Link from "next/link";

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
            <div className="h-80 flex items-center justify-center gap-2">
              <div className="spinner" />
              <span>Loading featured posts...</span>
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
            <div className="h-64 flex items-center justify-center gap-2">
              <div className="spinner" />
              <span>Loading recent posts...</span>
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

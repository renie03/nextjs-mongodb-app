import FeaturedPosts from "@/components/site/FeaturedPosts";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex items-center gap-2">
            <div className="spinner" />
            <span>Loading featured posts...</span>
          </div>
        }
      >
        <FeaturedPosts />
      </Suspense>
    </div>
  );
}

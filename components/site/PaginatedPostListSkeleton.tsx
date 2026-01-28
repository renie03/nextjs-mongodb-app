import PostItemSkeleton from "./PostItemSkeleton";

const PaginatedPostListSkeleton = () => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <PostItemSkeleton key={i} />
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-center gap-1 mt-5">
        <div className="flex items-center gap-1">
          <div className="h-8 w-8 bg-bgSoft rounded-md" />
          <div className="h-8 w-8 bg-bgSoft rounded-md" />
          <div className="h-8 w-8 bg-bgSoft rounded-md" />
          <div className="h-8 w-8 bg-bgSoft rounded-md" />
          <div className="h-8 w-8 bg-bgSoft rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default PaginatedPostListSkeleton;

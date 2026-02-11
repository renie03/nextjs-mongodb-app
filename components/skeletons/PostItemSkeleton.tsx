const PostItemSkeleton = () => {
  return (
    <div className="border border-bgSoft rounded-xl animate-pulse">
      <div className="bg-bgSoft aspect-2/1 rounded-t-xl" />
      <div className="p-3">
        <div className="h-6 w-15 bg-bgSoft rounded-md" />
        <div className="flex items-center justify-between mt-2">
          <div className="h-5 w-15 bg-bgSoft rounded-md" />
          <div className="h-5 w-18 bg-bgSoft rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default PostItemSkeleton;

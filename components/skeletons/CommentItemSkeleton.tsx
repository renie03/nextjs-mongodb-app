const CommentItemSkeleton = () => {
  return (
    <div className="flex gap-2 animate-pulse">
      <div className="h-10 w-10 bg-bgSoft rounded-full" />
      <div className="w-full">
        <div className="h-4 w-35 bg-bgSoft rounded mb-1" />
        <div className="h-5 w-full bg-bgSoft rounded mb-1" />
        <div className="h-5 w-full bg-bgSoft rounded mb-3" />
        <div className="h-5 w-16 bg-bgSoft rounded" />
      </div>
    </div>
  );
};

export default CommentItemSkeleton;

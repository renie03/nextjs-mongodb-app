const PostItemSkeleton = () => {
  return (
    <div className="border border-bgSoft rounded-xl">
      <div className="bg-bgSoft aspect-2/1 rounded-t-xl" />
      <div className="p-3">
        <div className="h-6 bg-bgSoft rounded-md w-15" />
        <div className="flex items-center justify-between mt-2">
          <div className="h-5 bg-bgSoft rounded-md w-15" />
          <div className="h-5 bg-bgSoft rounded-md w-18" />
        </div>
      </div>
    </div>
  );
};

export default PostItemSkeleton;

const PostItemSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-bgSoft rounded-xl aspect-2/1" />
      <div className="p-3">
        <div className="h-6.25 bg-bgSoft rounded-md w-15" />
        <div className="flex items-center justify-between mt-2">
          <div className="h-5 bg-bgSoft rounded-md w-15" />
          <div className="h-5 bg-bgSoft rounded-md w-15" />
        </div>
      </div>
    </div>
  );
};

export default PostItemSkeleton;

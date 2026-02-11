import { Session } from "next-auth";

const CommentsHeaderSkeleton = ({ session }: { session: Session | null }) => {
  return (
    <div className="animate-pulse">
      <div className="h-5 w-28 bg-bgSoft rounded mb-5" />
      {session?.user ? (
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-bgSoft rounded-full" />
          <div className="space-y-0.5 w-full">
            <div className="h-3 w-28 bg-bgSoft rounded" />
            <div className="h-0.5 w-full bg-bgSoft rounded-full" />
          </div>
        </div>
      ) : (
        <div className="h-3 w-45 bg-bgSoft rounded mb-2" />
      )}
    </div>
  );
};

export default CommentsHeaderSkeleton;

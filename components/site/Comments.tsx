"use client";

import { Session } from "next-auth";
import { CommentType } from "@/types/types";
import Comment from "./Comment";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import AddCommentForm from "./AddCommentForm";
import Link from "next/link";
import CommentsHeaderSkeleton from "./CommentsHeaderSkeleton";

const fetchComments = async ({
  pageParam,
  postId,
}: {
  pageParam: number;
  postId: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/comments?cursor=${pageParam}&postId=${postId}`,
  );
  return res.json();
};

const Comments = ({
  postId,
  session,
}: {
  postId: string;
  session: Session | null;
}) => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam = 0 }) => fetchComments({ pageParam, postId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  // console.log(data);

  const allComments: CommentType[] =
    data?.pages?.flatMap((page) => page.comments) || [];

  const totalComments = data?.pages?.[0]?.totalComments || 0;

  if (status === "pending") {
    return <CommentsHeaderSkeleton session={session} />;
  }

  if (status === "error") {
    return "Something went wrong";
  }

  return (
    <div>
      <h1 className="text-xl font-medium mb-5">
        {totalComments} {totalComments === 1 ? "comment" : "comments"}
      </h1>
      {session?.user ? (
        <div className="flex gap-2">
          <Image
            src={session.user?.image || "/noavatar.png"}
            width={40}
            height={40}
            alt={session.user?.name || "user avatar"}
            className="h-10 w-10 rounded-full object-cover"
          />
          <AddCommentForm postId={postId} />
        </div>
      ) : (
        <div className="mb-2">
          <Link href="/login" className="underline">
            Login to write a comment
          </Link>
        </div>
      )}
      <InfiniteScroll
        dataLength={allComments.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <div>
            <div className="flex flex-col gap-7 mt-7">
              {Array.from({ length: 3 }).map((_, i) => (
                <div className="flex gap-2" key={i}>
                  <div className="h-10 w-10 bg-bgSoft rounded-full" />
                  <div className="w-full">
                    <div className="h-4 w-35 bg-bgSoft rounded mb-1" />
                    <div className="h-5 w-full bg-bgSoft rounded mb-1" />
                    <div className="h-5 w-full bg-bgSoft rounded mb-3" />
                    <div className="h-5 w-16 bg-bgSoft rounded" />
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center py-5">
              <div className="spinner" />
            </div>
          </div>
        }
        style={{ overflow: "visible" }}
        endMessage={
          allComments.length !== 0 && (
            <p className="mt-5 text-textSoft">All comments loaded!</p>
          )
        }
      >
        <div className="flex flex-col gap-7 mt-7">
          {allComments.length === 0 ? (
            <div className="text-center text-textSoft font-semibold py-5">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            allComments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                postId={postId}
                userId={session?.user.id}
              />
            ))
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Comments;

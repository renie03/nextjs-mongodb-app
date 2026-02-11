import { Suspense } from "react";
import Image from "next/image";
import { getPost } from "@/lib/data";
import { PostType } from "@/types/types";
import { format } from "timeago.js";
import ImageKitBlur from "@/components/shared/ImageKitBlur";
import ViewCounter from "@/components/site/ViewCounter";
import RelatedPosts from "@/components/site/RelatedPosts";
import PostItemSkeleton from "@/components/skeletons/PostItemSkeleton";
import Comments from "@/components/site/Comments";
import { auth } from "@/lib/auth";

const SinglePostPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const session = await auth();

  const post: PostType = await getPost(id);

  return (
    <div>
      <ViewCounter id={id} />
      <div className="flex flex-col md:flex-row gap-5 lg:gap-10">
        <div className="w-full md:w-5/12 aspect-2/1 md:aspect-5/4 relative">
          <ImageKitBlur
            src={post.img || "/noproduct.jpg"}
            alt={post.title || "post image"}
            fill
            className="rounded-xl"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>
        <div className="w-full md:w-7/12 flex flex-col justify-between">
          <div className="mb-4">
            <h1 className="text-xl lg:text-2xl font-semibold mb-0 lg:mb-1">
              {post.title}
            </h1>
            <h2 className="text-lg lg:text-xl font-medium mb-2 lg:mb-5">
              {post.category}
            </h2>
            <p className="text-justify">{post.desc}</p>
          </div>
          <div>
            <h1 className="hidden md:block mb-2">Author</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={post.user?.image || "/noavatar.png"}
                  width={40}
                  height={40}
                  alt={post.user?.name || "user avatar"}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span>{post.user?.name}</span>
              </div>
              <span className="text-textSoft text-sm lg:text-base">
                {format(post.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-hrColor my-4" />
      <div>
        <h1 className="text-xl font-semibold mb-2">Related Post</h1>
        <Suspense
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <PostItemSkeleton key={i} />
              ))}
            </div>
          }
        >
          <RelatedPosts category={post.category} postId={id} />
        </Suspense>
      </div>
      <hr className="border-hrColor my-4" />
      <Comments postId={id} session={session} />
    </div>
  );
};

export default SinglePostPage;

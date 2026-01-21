import Link from "next/link";
import { format } from "timeago.js";
import { PostType } from "@/types/types";
import ImageKitBlur from "../shared/ImageKitBlur";

const PostItem = ({ post }: { post: PostType }) => {
  return (
    <div
      key={post._id}
      className="flex flex-col border border-bgSoft rounded-xl"
    >
      <Link href={`/posts/${post._id}`}>
        <div className="relative aspect-2/1 rounded-t-xl overflow-hidden">
          <ImageKitBlur
            src={post.img || "/noproduct.jpg"}
            alt={post.title || "post image"}
            fill
            className="hover:scale-105 transition-all duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </Link>
      <div className="p-3">
        <h1 className="text-lg font-medium">{post.title}</h1>
        <div className="flex items-center justify-between">
          <h2>{post.category}</h2>
          <span className="text-textSoft text-sm">
            {format(post.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

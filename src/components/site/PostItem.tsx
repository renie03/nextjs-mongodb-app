import Link from "next/link";
import Image from "next/image";
import { format } from "timeago.js";
import { PostType } from "@/types/types";

const PostItem = ({ post }: { post: PostType }) => {
  return (
    <div key={post._id} className="flex flex-col">
      <Link href={`/posts/${post._id}`} className="relative aspect-[2/1]">
        <Image
          src={post.img || "/noproduct.jpg"}
          fill
          className="rounded-xl transition-opacity duration-300 ease-in-out"
          alt={post.title}
          sizes="(max-width: 768px) 100vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAuMBgqA7zGAAAAAASUVORK5CYII="
        />
      </Link>
      <h1 className="text-lg font-medium mt-1">{post.title}</h1>
      <div className="flex items-center justify-between">
        <h2>{post.category}</h2>
        <span className="text-textSoft text-sm">{format(post.createdAt)}</span>
      </div>
    </div>
  );
};

export default PostItem;

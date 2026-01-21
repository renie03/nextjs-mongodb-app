"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { updatePost } from "@/lib/actions/postActions";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePostInputs, updatePostSchema } from "@/lib/schemas/post.schema";
import { PostType } from "@/types/types";
import ImageKitUpload from "../shared/ImageKitUpload";

const UpdatePostForm = ({
  setOpen,
  post,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostType;
}) => {
  const [file, setFile] = useState<string | null>(post?.img || null);
  const [isUploading, setIsUploading] = useState(false);

  const [state, formAction, isPending] = useActionState(updatePost, {
    success: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePostInputs>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      title: post.title,
      desc: post.desc,
      category: post.category,
      isFeatured: post.isFeatured,
    },
  });

  const handleUpdatePostForm: SubmitHandler<UpdatePostInputs> = (data) => {
    startTransition(() => {
      formAction({ ...data, img: file });
    });
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, setOpen]);

  return (
    <form
      onSubmit={handleSubmit(handleUpdatePostForm)}
      className="flex flex-col gap-5 text-black"
    >
      <h1 className="text-lg font-medium text-center">Update Post</h1>
      <input type="hidden" value={post._id} {...register("id")} />
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Title</label>
        <div>
          <input
            className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1 aria-invalid:border-red-500 aria-invalid:ring-red-500"
            type="text"
            id="title"
            autoFocus
            aria-invalid={!!errors.title}
            {...register("title")}
          />
          {errors.title?.message && (
            <p className="text-red-500 text-sm">{errors.title?.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="desc">Description</label>
        <div>
          <input
            className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1 aria-invalid:border-red-500 aria-invalid:ring-red-500"
            type="text"
            id="desc"
            aria-invalid={!!errors.desc}
            {...register("desc")}
          />
          {errors.desc?.message && (
            <p className="text-red-500 text-sm">{errors.desc?.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="category">Category</label>
        <select
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          id="category"
          {...register("category")}
        >
          <option value="general">General</option>
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="sports">Sports</option>
          <option value="education">Education</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input
          className="scheme-light"
          type="checkbox"
          id="isFeatured"
          {...register("isFeatured")}
        />
        <label htmlFor="isFeatured">Is Featured?</label>
      </div>
      <div className="flex flex-col">
        {file && (
          <div className="self-center">
            <Image
              src={file}
              width={48}
              height={48}
              alt="post image preview"
              className="h-12 w-12 object-cover rounded-full mb-1"
            />
          </div>
        )}
        <ImageKitUpload setState={setFile} setIsUploading={setIsUploading} />
      </div>
      <input type="hidden" value={file || ""} {...register("img")} />
      <button
        className="bg-blue-600 dark:bg-blue-700 text-white rounded-md p-3 cursor-pointer enabled:hover:bg-blue-700 enabled:dark:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isPending || isUploading}
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="spinner" />
            <span>Updating...</span>
          </div>
        ) : (
          "Update"
        )}
      </button>
    </form>
  );
};

export default UpdatePostForm;

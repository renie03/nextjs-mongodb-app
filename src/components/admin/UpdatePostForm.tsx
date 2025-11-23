"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { updatePost } from "@/lib/actions/postActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdatePostFormInputs,
  updatePostSchema,
} from "@/lib/validationSchemas";
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

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePostFormInputs>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      title: post.title,
      desc: post.desc,
      category: post.category,
      isFeatured: post.isFeatured ? "true" : "false",
    },
  });

  const handleUpdatePostForm: SubmitHandler<UpdatePostFormInputs> = (data) => {
    startTransition(() => {
      formAction({ ...data, img: file });
    });
  };

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      toast.success(state.message);
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router, setOpen]);

  return (
    <form
      onSubmit={handleSubmit(handleUpdatePostForm)}
      className="flex flex-col gap-5 text-black w-[280px]"
    >
      <h1 className="text-lg font-medium text-center">Update Post</h1>
      <input type="hidden" value={post._id || ""} {...register("id")} />
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Title</label>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          type="text"
          id="title"
          autoFocus
          {...register("title")}
        />
        {errors.title?.message && (
          <p className="text-red-500 text-sm">{errors.title?.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="desc">Description</label>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          type="text"
          id="desc"
          {...register("desc")}
        />
        {errors.desc?.message && (
          <p className="text-red-500 text-sm">{errors.desc?.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          className="border border-gray-300 rounded-md p-2 ml-1 focus:ring-black focus:ring-1"
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
      <div>
        <label htmlFor="isFeatured">Featured:</label>
        <select
          className="border border-gray-300 rounded-md p-2 ml-1 focus:ring-black focus:ring-1"
          id="isFeatured"
          {...register("isFeatured")}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
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
        className="bg-blue-600 dark:bg-blue-700 enabled:hover:bg-blue-700 enabled:dark:hover:bg-blue-800 text-white rounded-md p-3 cursor-pointer disabled:cursor-not-allowed"
        disabled={isPending || isUploading}
      >
        {isPending ? <div className="spinner" /> : "Update"}
      </button>
    </form>
  );
};

export default UpdatePostForm;

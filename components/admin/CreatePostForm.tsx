"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { createPost } from "@/lib/actions/postActions";
import { toast } from "react-toastify";
import { PostInputs, postSchema } from "@/lib/schemas/post.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageKitUpload from "../shared/ImageKitUpload";

const CreatePostForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [file, setFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [state, formAction, isPending] = useActionState(createPost, {
    success: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostInputs>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      category: "",
    },
  });

  const handleCreatePostForm: SubmitHandler<PostInputs> = (data) => {
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
      onSubmit={handleSubmit(handleCreatePostForm)}
      className="flex flex-col gap-5 text-black"
    >
      <h1 className="text-lg font-medium text-center">Create Post</h1>
      <div>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1 aria-invalid:border-red-500 aria-invalid:ring-red-500"
          type="text"
          placeholder="Title"
          autoFocus
          aria-invalid={!!errors.title}
          {...register("title")}
        />
        {errors.title?.message && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1 aria-invalid:border-red-500 aria-invalid:ring-red-500"
          type="text"
          placeholder="Description"
          aria-invalid={!!errors.desc}
          {...register("desc")}
        />
        {errors.desc?.message && (
          <p className="text-red-500 text-sm">{errors.desc.message}</p>
        )}
      </div>
      <div>
        <select
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1 aria-invalid:border-red-500 aria-invalid:ring-red-500"
          aria-invalid={!!errors.category}
          {...register("category")}
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="general">General</option>
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="sports">Sports</option>
          <option value="education">Education</option>
        </select>
        {errors.category?.message && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
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
        className="bg-blue-600 hover:bg-black text-white rounded-md p-3 cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400"
        disabled={isPending || isUploading}
      >
        {isPending ? <div className="spinner" /> : "Create"}
      </button>
    </form>
  );
};

export default CreatePostForm;

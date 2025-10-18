"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { IoCloudUploadOutline } from "react-icons/io5";
import { createPost } from "@/lib/actions/postActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { postSchema, PostSchema } from "@/lib/validationSchemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const CreatePostForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [file, setFile] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState(createPost, {
    success: false,
    message: "",
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
  });

  // ✅ Handle form submission
  const handleCreatePostForm: SubmitHandler<PostSchema> = (data) => {
    startTransition(() => {
      formAction({ ...data, img: file });
    });
  };

  // ✅ Handle toast + modal close on result
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
      onSubmit={handleSubmit(handleCreatePostForm)}
      className="flex flex-col gap-5 text-black w-[280px]"
    >
      <h1 className="text-lg font-medium text-center">Create Post</h1>

      {/* Title */}
      <div>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          placeholder="Title"
          autoFocus
          {...register("title")}
        />
        {errors.title?.message && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          placeholder="Description"
          {...register("desc")}
        />
        {errors.desc?.message && (
          <p className="text-red-500 text-sm">{errors.desc.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <select
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          {...register("category")}
        >
          <option value="">Select Category</option>
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

      {/* Is Featured */}
      <div>
        <select
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          {...register("isFeatured")}
        >
          <option value="false">Is Featured?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {errors.isFeatured?.message && (
          <p className="text-red-500 text-sm">{errors.isFeatured.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="flex flex-col">
        {/* ✅ Image Preview */}
        {file && (
          <div className="self-center relative">
            <Image
              src={file}
              alt="Uploaded photo"
              width={48}
              height={48}
              className="h-12 w-12 object-cover rounded-full mb-1"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcs3j9fwAGwALvQexiRwAAAABJRU5ErkJggg=="
            />
            <div
              className="absolute -top-1 right-0 cursor-pointer bg-gray-200 dark:bg-gray-700 text-xs h-4 w-4 rounded-full flex items-center justify-center"
              onClick={() => setFile(null)}
            >
              X
            </div>
          </div>
        )}

        {/* ✅ Cloudinary Upload Widget */}
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
          // onSuccess={(result) => console.log(result)}
          onSuccess={(result, { widget }) => {
            const info = result.info as { secure_url?: string };
            if (info?.secure_url) setFile(info.secure_url);
            widget.close();
          }}
        >
          {({ open }) => (
            <div
              className="flex items-center gap-2 cursor-pointer text-gray-500 text-sm"
              onClick={() => open()}
            >
              <IoCloudUploadOutline size={20} />
              <span>Upload a photo</span>
            </div>
          )}
        </CldUploadWidget>
      </div>

      {/* Submit Button */}
      <button
        className="bg-blue-500 dark:bg-blue-700 text-white rounded-md p-3 cursor-pointer disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? <div className="spinner" /> : "Create"}
      </button>
    </form>
  );
};

export default CreatePostForm;

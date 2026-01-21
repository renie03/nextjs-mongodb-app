"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Image from "next/image";
import { createUser } from "@/lib/actions/userActions";
import { toast } from "react-toastify";
import { UserInputs, userSchema } from "@/lib/schemas/user.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageKitUpload from "../shared/ImageKitUpload";

const CreateUserForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [state, formAction, isPending] = useActionState(createUser, {
    success: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputs>({
    resolver: zodResolver(userSchema),
  });

  const handleCreateUserForm: SubmitHandler<UserInputs> = (data) => {
    startTransition(() => {
      formAction({ ...data, image: file });
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
      onSubmit={handleSubmit(handleCreateUserForm)}
      className="flex flex-col gap-5 text-black"
    >
      <h1 className="text-lg font-medium text-center">Create User</h1>
      <div>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1 aria-invalid:border-red-500 aria-invalid:ring-red-500"
          type="text"
          placeholder="username"
          autoFocus
          aria-invalid={!!errors.username}
          {...register("username")}
        />
        {errors.username?.message && (
          <p className="text-red-500 text-sm">{errors.username?.message}</p>
        )}
      </div>
      <div>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1 aria-invalid:border-red-500 aria-invalid:ring-red-500"
          type="email"
          placeholder="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        )}
      </div>
      <div>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1 aria-invalid:border-red-500 aria-invalid:ring-red-500"
          type="text"
          placeholder="name"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        )}
      </div>
      <div>
        <div
          className="border border-gray-300 rounded-md p-3 flex items-center justify-between gap-1 focus-within:ring-black focus-within:ring-1 aria-invalid:border-red-500 aria-invalid:focus-within:ring-red-500"
          aria-invalid={!!errors.password}
        >
          <input
            className="w-full ring-0"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            {...register("password")}
          />
          <span
            className="cursor-pointer dark:text-textSoft"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <MdOutlineVisibility size={20} />
            ) : (
              <MdOutlineVisibilityOff size={20} />
            )}
          </span>
        </div>
        {errors.password?.message && (
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          className="scheme-light"
          type="checkbox"
          id="isAdmin"
          {...register("isAdmin")}
        />
        <label htmlFor="isAdmin">Is Admin?</label>
      </div>
      <div className="flex flex-col">
        {file && (
          <div className="self-center">
            <Image
              src={file}
              width={48}
              height={48}
              alt="user image preview"
              className="h-12 w-12 object-cover rounded-full mb-1"
            />
          </div>
        )}
        <ImageKitUpload setState={setFile} setIsUploading={setIsUploading} />
      </div>
      <input type="hidden" value={file || ""} {...register("image")} />
      <button
        className="bg-blue-600 dark:bg-blue-700 text-white rounded-md p-3 cursor-pointer enabled:hover:bg-blue-700 enabled:dark:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isPending || isUploading}
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="spinner" />
            <span>Creating...</span>
          </div>
        ) : (
          "Create"
        )}
      </button>
    </form>
  );
};

export default CreateUserForm;

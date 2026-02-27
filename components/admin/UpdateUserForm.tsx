"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Image from "next/image";
import { adminUpdateUser } from "@/lib/actions/userActions";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminUpdateUserInputs, adminUpdateUserSchema } from "@/lib/schemas";
import { UserType } from "@/types/types";
import ImageKitUpload from "../shared/ImageKitUpload";
import { IoClose } from "react-icons/io5";

const UpdateUserForm = ({
  setOpen,
  user,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState<string | null>(user.image || null);
  const [isUploading, setIsUploading] = useState(false);

  const [state, formAction, isPending] = useActionState(adminUpdateUser, {
    success: false,
    message: "",
  });

  const isCredentials = !!user.username;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminUpdateUserInputs>({
    resolver: zodResolver(adminUpdateUserSchema),
    defaultValues: {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    },
  });

  const handleUpdateUserForm: SubmitHandler<AdminUpdateUserInputs> = (data) => {
    const updateData: AdminUpdateUserInputs = {
      id: data.id,
      name: data.name,
      image: file,
      isAdmin: data.isAdmin,
    };

    if (isCredentials) {
      updateData.username = data.username;
      updateData.email = data.email;

      if (data.password && data.password.trim() !== "") {
        updateData.password = data.password;
      }
    }

    startTransition(() => {
      formAction(updateData);
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
      onSubmit={handleSubmit(handleUpdateUserForm)}
      className="flex flex-col gap-5 text-black"
    >
      <h1 className="text-lg font-medium text-center">Update User</h1>
      <input type="hidden" {...register("id")} />
      {isCredentials && (
        <>
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <div>
              <input
                className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1 aria-invalid:border-red-500 aria-invalid:ring-red-500"
                type="text"
                id="username"
                autoFocus={isCredentials}
                aria-invalid={!!errors.username}
                {...register("username")}
              />
              {errors.username?.message && (
                <p className="text-red-500 text-sm">
                  {errors.username?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <div>
              <input
                className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1 aria-invalid:border-red-500 aria-invalid:ring-red-500"
                type="email"
                id="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              )}
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name</label>
        <div>
          <input
            className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1 aria-invalid:border-red-500 aria-invalid:ring-red-500"
            type="text"
            id="name"
            autoFocus={!isCredentials}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          )}
        </div>
      </div>
      {isCredentials && (
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <div>
            <div
              className="border border-gray-300 rounded-md p-3 flex items-center justify-between gap-1 focus-within:ring-black focus-within:ring-1 aria-invalid:border-red-500 aria-invalid:focus-within:ring-red-500"
              aria-invalid={!!errors.password}
            >
              <input
                className="w-full ring-0"
                type={showPassword ? "text" : "password"}
                id="password"
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
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          className="scheme-light"
          type="checkbox"
          id="isAdmin"
          {...register("isAdmin")}
        />
        <label htmlFor="isAdmin">Is Admin?</label>
      </div>
      <div>
        {file && (
          <div className="flex flex-col items-center mb-2">
            <div className="relative">
              <Image
                src={file}
                width={48}
                height={48}
                alt="post image preview"
                className="h-12 w-12 object-cover rounded-full"
              />
              <button
                type="button"
                onClick={() => setFile(null)}
                className="absolute -top-1 -right-1 bg-gray-500 p-px rounded-full text-white flex items-center justify-center cursor-pointer"
              >
                <IoClose size={18} />
              </button>
            </div>
          </div>
        )}
        <ImageKitUpload setState={setFile} setIsUploading={setIsUploading} />
      </div>
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

export default UpdateUserForm;

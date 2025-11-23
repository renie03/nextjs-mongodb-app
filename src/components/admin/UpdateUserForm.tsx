"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Image from "next/image";
import { adminUpdateUser } from "@/lib/actions/userActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AdminUpdateUserFormInputs,
  adminUpdateUserSchema,
} from "@/lib/validationSchemas";
import { UserType } from "@/types/types";
import ImageKitUpload from "../shared/ImageKitUpload";

const UpdateUserForm = ({
  setOpen,
  user,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState<string | null>(user?.image || null);
  const [isUploading, setIsUploading] = useState(false);

  const [state, formAction, isPending] = useActionState(adminUpdateUser, {
    success: false,
    message: "",
  });

  const router = useRouter();

  const isCredentials = !!user?.username;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminUpdateUserFormInputs>({
    resolver: zodResolver(adminUpdateUserSchema),
    defaultValues: isCredentials
      ? {
          username: user.username,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin ? "true" : "false",
        }
      : {
          name: user.name,
          isAdmin: user.isAdmin ? "true" : "false",
        },
  });

  const handleUpdateUserForm: SubmitHandler<AdminUpdateUserFormInputs> = (
    data
  ) => {
    startTransition(() => {
      formAction({ ...data, image: file });
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
      onSubmit={handleSubmit(handleUpdateUserForm)}
      className="flex flex-col gap-5 text-black w-[280px]"
    >
      <h1 className="text-lg font-medium text-center">Update User</h1>
      <input type="hidden" value={user._id || ""} {...register("id")} />
      {isCredentials && (
        <>
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
              id="username"
              autoFocus={isCredentials}
              {...register("username")}
            />
            {errors.username?.message && (
              <p className="text-red-500 text-sm">{errors.username?.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
              id="email"
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            )}
          </div>
        </>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name</label>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          id="name"
          autoFocus={!isCredentials}
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        )}
      </div>
      {isCredentials && (
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <div className="border border-gray-300 rounded-md p-3 flex items-center justify-between gap-1 focus-within:ring-black focus-within:ring-1">
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
      )}
      <div>
        <label htmlFor="isAdmin">Admin:</label>
        <select
          className="border border-gray-300 rounded-md p-2 ml-1 focus:ring-black focus:ring-1"
          id="isAdmin"
          {...register("isAdmin")}
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
              alt="user image preview"
              className="h-12 w-12 object-cover rounded-full mb-1"
            />
          </div>
        )}
        <ImageKitUpload setState={setFile} setIsUploading={setIsUploading} />
      </div>
      <input type="hidden" value={file || ""} {...register("image")} />
      <button
        className="bg-blue-600 dark:bg-blue-700 enabled:hover:bg-blue-700 enabled:dark:hover:bg-blue-800 text-white rounded-md p-3 cursor-pointer disabled:cursor-not-allowed"
        disabled={isPending || isUploading}
      >
        {isPending ? <div className="spinner" /> : "Update"}
      </button>
    </form>
  );
};

export default UpdateUserForm;

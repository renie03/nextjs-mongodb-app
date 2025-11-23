"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { Session } from "next-auth";
import Image from "next/image";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { updateUser } from "@/lib/actions/userActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateUserFormInputs,
  updateUserSchema,
} from "@/lib/validationSchemas";
import ImageKitUpload from "../shared/ImageKitUpload";

const ProfileUpdateForm = ({ session }: { session: Session | null }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(
    session?.user?.image || null
  );
  const [isUploading, setIsUploading] = useState(false);

  const [state, formAction, isPending] = useActionState(updateUser, {
    success: false,
    message: "",
  });

  const router = useRouter();

  const isCredentials = !!session?.user?.username;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserFormInputs>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: isCredentials
      ? {
          username: session?.user?.username ?? "",
          name: session?.user?.name ?? "",
        }
      : {
          name: session?.user?.name ?? "",
        },
  });

  const handleProfileUpdateForm: SubmitHandler<UpdateUserFormInputs> = (
    data
  ) => {
    startTransition(() => {
      formAction({ ...data, image: avatar });
    });
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setValue("password", "");
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router, setValue]);

  return (
    <form
      onSubmit={handleSubmit(handleProfileUpdateForm)}
      className="flex flex-col gap-5 w-[280px]"
    >
      <h1 className="text-lg font-medium text-center">Update</h1>
      {isCredentials && (
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            className="border border-borderColor rounded-md p-3 w-full"
            type="text"
            id="username"
            autoFocus={isCredentials}
            {...register("username")}
          />
          {errors.username?.message && (
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          )}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name</label>
        <input
          className="border border-borderColor rounded-md p-3 w-full"
          type="text"
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
          <div className="border border-borderColor rounded-md p-3 flex items-center justify-between gap-1 focus-within:ring-focusColor focus-within:ring-1">
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
      <div className="flex flex-col">
        {avatar && (
          <div className="self-center">
            <Image
              src={avatar}
              width={48}
              height={48}
              alt="profile picture preview"
              className="h-12 w-12 object-cover rounded-full mb-1"
            />
          </div>
        )}
        <ImageKitUpload setState={setAvatar} setIsUploading={setIsUploading} />
      </div>
      <input type="hidden" value={avatar || ""} {...register("image")} />
      <button
        className="bg-blue-600 dark:bg-blue-700 enabled:hover:bg-blue-700 enabled:dark:hover:bg-blue-800 text-white rounded-md p-3 cursor-pointer disabled:cursor-not-allowed"
        disabled={isPending || isUploading}
      >
        {isPending ? <div className="spinner" /> : "Update"}
      </button>
    </form>
  );
};

export default ProfileUpdateForm;

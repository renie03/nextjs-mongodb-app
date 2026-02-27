"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { Session } from "next-auth";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { updateUser } from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import ImageKitUpload from "../shared/ImageKitUpload";
import { IoClose } from "react-icons/io5";
import { UpdateUserInputs, updateUserSchema } from "@/lib/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ProfileUpdateForm = ({ session }: { session: Session | null }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(
    session?.user?.image || null,
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
  } = useForm<UpdateUserInputs>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: session?.user?.username ?? "",
      email: session?.user?.email ?? "",
      name: session?.user?.name ?? "",
    },
  });

  const handleProfileUpdateForm: SubmitHandler<UpdateUserInputs> = (data) => {
    const updateData: UpdateUserInputs = {
      name: data.name,
      image: avatar,
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
      setValue("password", "");
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router, setValue]);

  return (
    <form
      onSubmit={handleSubmit(handleProfileUpdateForm)}
      className="flex flex-col gap-5"
    >
      <h1 className="text-lg font-medium text-center">Update</h1>
      {isCredentials && (
        <>
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <div>
              <input
                className="border border-borderColor rounded-md p-3 w-full aria-invalid:border-red-500 aria-invalid:ring-red-500"
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
                className="border border-borderColor rounded-md p-3 w-full aria-invalid:border-red-500 aria-invalid:ring-red-500"
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
            className="border border-borderColor rounded-md p-3 w-full aria-invalid:border-red-500 aria-invalid:ring-red-500"
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
              className="border border-borderColor rounded-md p-3 flex items-center justify-between gap-1 focus-within:ring-focusColor focus-within:ring-1 aria-invalid:border-red-500 aria-invalid:focus-within:ring-red-500"
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
      <div>
        {avatar && (
          <div className="flex flex-col items-center mb-2">
            <div className="relative">
              <Image
                src={avatar}
                width={48}
                height={48}
                alt="profile picture preview"
                className="h-12 w-12 object-cover rounded-full"
              />
              <button
                type="button"
                onClick={() => setAvatar(null)}
                className="absolute -top-1 -right-1 bg-gray-500 p-px rounded-full text-white flex items-center justify-center cursor-pointer"
              >
                <IoClose size={18} />
              </button>
            </div>
          </div>
        )}
        <ImageKitUpload setState={setAvatar} setIsUploading={setIsUploading} />
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

export default ProfileUpdateForm;

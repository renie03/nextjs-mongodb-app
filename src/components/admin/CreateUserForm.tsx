"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Image from "next/image";
import { createUser } from "@/lib/actions/userActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UserFormInputs, userSchema } from "@/lib/validationSchemas";
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

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>({
    resolver: zodResolver(userSchema),
  });

  const handleCreateUserForm: SubmitHandler<UserFormInputs> = (data) => {
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
      onSubmit={handleSubmit(handleCreateUserForm)}
      className="flex flex-col gap-5 text-black w-[280px]"
    >
      <h1 className="text-lg font-medium text-center">Create User</h1>
      <div>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          placeholder="username"
          autoFocus
          {...register("username")}
        />
        {errors.username?.message && (
          <p className="text-red-500 text-sm">{errors.username?.message}</p>
        )}
      </div>
      <div>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          type="email"
          placeholder="email"
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        )}
      </div>
      <div>
        <input
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
          placeholder="name"
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        )}
      </div>
      <div>
        <div className="border border-gray-300 rounded-md p-3 flex items-center justify-between gap-1 focus-within:ring-black focus-within:ring-1">
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
      <select
        className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
        defaultValue="false"
        {...register("isAdmin")}
      >
        <option value="false" hidden>
          Is Admin?
        </option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
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
      <input type="hidden" value={file || ""} {...register("image")} />
      <button
        className="bg-blue-600 dark:bg-blue-700 enabled:hover:bg-blue-700 enabled:dark:hover:bg-blue-800 text-white rounded-md p-3 cursor-pointer disabled:cursor-not-allowed"
        disabled={isPending || isUploading}
      >
        {isPending ? <div className="spinner" /> : "Create"}
      </button>
    </form>
  );
};

export default CreateUserForm;

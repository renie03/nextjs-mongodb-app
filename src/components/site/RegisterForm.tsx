"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { register } from "@/lib/actions/userActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import ImageKitUpload from "../shared/ImageKitUpload";
import { RegisterFormInputs, registerSchema } from "@/lib/validationSchemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [state, formAction, isPending] = useActionState(register, {
    success: false,
    message: "",
  });

  const router = useRouter();

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegisterForm: SubmitHandler<RegisterFormInputs> = (data) => {
    // console.log({ ...data, image: avatar });
    startTransition(() => {
      formAction({ ...data, image: avatar });
    });
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/login");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form
      onSubmit={handleSubmit(handleRegisterForm)}
      className="flex flex-col gap-5 w-[280px]"
    >
      <h1 className="text-lg font-medium text-center">Register</h1>
      <div>
        <input
          className="border border-borderColor rounded-md p-3 w-full"
          type="text"
          placeholder="username"
          autoFocus
          {...registerForm("username")}
        />
        {errors.username?.message && (
          <p className="text-red-500 text-sm">{errors.username?.message}</p>
        )}
      </div>
      <div>
        <input
          className="border border-borderColor rounded-md p-3 w-full"
          type="email"
          placeholder="email"
          {...registerForm("email")}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        )}
      </div>
      <div>
        <input
          className="border border-borderColor rounded-md p-3 w-full"
          type="text"
          placeholder="name"
          {...registerForm("name")}
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        )}
      </div>
      <div>
        <div className="border border-borderColor rounded-md p-3 flex items-center justify-between gap-1 focus-within:ring-focusColor focus-within:ring-1">
          <input
            className="w-full ring-0"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            {...registerForm("password")}
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
      <div>
        <div className="border border-borderColor rounded-md p-3 flex items-center justify-between gap-1 focus-within:ring-focusColor focus-within:ring-1">
          <input
            className="w-full ring-0"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="confirm password"
            {...registerForm("confirmPassword")}
          />
          <span
            className="cursor-pointer dark:text-textSoft"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? (
              <MdOutlineVisibility size={20} />
            ) : (
              <MdOutlineVisibilityOff size={20} />
            )}
          </span>
        </div>
        {errors.confirmPassword?.message && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>
        )}
      </div>
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
      <input type="hidden" value={avatar || ""} {...registerForm("image")} />
      <button
        className="bg-blue-600 dark:bg-blue-700 enabled:hover:bg-blue-700 enabled:dark:hover:bg-blue-800 text-white rounded-md p-3 cursor-pointer disabled:cursor-not-allowed"
        disabled={isPending || isUploading}
      >
        {isPending ? <div className="spinner" /> : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;

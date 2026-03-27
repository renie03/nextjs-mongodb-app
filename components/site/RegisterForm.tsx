"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { register } from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import ImageKitUpload from "../shared/ImageKitUpload";
import { IoClose } from "react-icons/io5";
import { RegisterInputs, registerSchema } from "@/lib/schemas";
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
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterForm: SubmitHandler<RegisterInputs> = (data) => {
    // console.log({ ...data, image: avatar });
    startTransition(() => {
      formAction({ ...data, image: avatar });
    });
  };

  useEffect(() => {
    if (state.success) {
      // toast.success(state.message);
      router.push("/");
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form
      onSubmit={handleSubmit(handleRegisterForm)}
      className="flex flex-col gap-5"
    >
      <h1 className="text-lg font-medium text-center">Register</h1>
      <div>
        <input
          className="border border-borderColor rounded-md p-3 w-full aria-invalid:border-red-500 aria-invalid:ring-red-500"
          type="text"
          placeholder="Username"
          autoFocus
          aria-invalid={!!errors.username}
          {...registerForm("username")}
        />
        {errors.username?.message && (
          <p className="text-red-500 text-sm">{errors.username?.message}</p>
        )}
      </div>
      <div>
        <input
          className="border border-borderColor rounded-md p-3 w-full aria-invalid:border-red-500 aria-invalid:ring-red-500"
          type="email"
          placeholder="Email"
          aria-invalid={!!errors.email}
          {...registerForm("email")}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        )}
      </div>
      <div>
        <input
          className="border border-borderColor rounded-md p-3 w-full aria-invalid:border-red-500 aria-invalid:ring-red-500"
          type="text"
          placeholder="Name"
          aria-invalid={!!errors.name}
          {...registerForm("name")}
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        )}
      </div>
      <div>
        <div
          className="border border-borderColor rounded-md p-3 w-full flex items-center justify-between gap-3 focus-within:ring-focusColor focus-within:ring-1 aria-invalid:border-red-500 aria-invalid:focus-within:ring-red-500"
          aria-invalid={!!errors.password}
        >
          <input
            className="w-full ring-0"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...registerForm("password")}
          />
          <span
            className="cursor-pointer dark:text-textSoft"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <MdOutlineVisibility size={24} />
            ) : (
              <MdOutlineVisibilityOff size={24} />
            )}
          </span>
        </div>
        {errors.password?.message && (
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        )}
      </div>
      <div>
        <div
          className="border border-borderColor rounded-md p-3 w-full flex items-center justify-between gap-3 focus-within:ring-focusColor focus-within:ring-1 aria-invalid:border-red-500 aria-invalid:focus-within:ring-red-500"
          aria-invalid={!!errors.confirmPassword}
        >
          <input
            className="w-full ring-0"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            {...registerForm("confirmPassword")}
          />
          <span
            className="cursor-pointer dark:text-textSoft"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? (
              <MdOutlineVisibility size={24} />
            ) : (
              <MdOutlineVisibilityOff size={24} />
            )}
          </span>
        </div>
        {errors.confirmPassword?.message && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>
        )}
      </div>
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
                className="absolute -top-1 -right-1 bg-gray-500 p-px rounded-full text-white flex items-center justify-center cursor-pointer active:opacity-70 transition-all duration-200"
              >
                <IoClose size={20} />
              </button>
            </div>
          </div>
        )}
        <ImageKitUpload setState={setAvatar} setIsUploading={setIsUploading} />
      </div>
      <button
        className="bg-blue-600 dark:bg-blue-700 text-white rounded-md p-3 cursor-pointer enabled:hover:bg-blue-700 enabled:dark:hover:bg-blue-600 enabled:active:scale-98 enabled:active:opacity-70 disabled:cursor-not-allowed disabled:opacity-70 transition-all duration-200"
        disabled={isPending || isUploading}
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="spinner" />
            <span>Registering...</span>
          </div>
        ) : (
          "Register"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;

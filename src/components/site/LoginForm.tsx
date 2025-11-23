"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { login } from "@/lib/actions/userActions";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormInputs } from "@/lib/validationSchemas";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(login, {
    success: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginForm: SubmitHandler<LoginFormInputs> = (data) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      onSubmit={handleSubmit(handleLoginForm)}
      className="flex flex-col gap-5 w-[280px]"
    >
      <h1 className="text-lg font-medium text-center">Login</h1>
      <div>
        <input
          className="border border-borderColor rounded-md p-3 w-full"
          type="text"
          placeholder="username"
          autoFocus
          {...register("username")}
        />
        {errors.username?.message && (
          <p className="text-red-500 text-sm">{errors.username?.message}</p>
        )}
      </div>
      <div>
        <div className="border border-borderColor rounded-md p-3 flex items-center justify-between gap-1 focus-within:ring-focusColor focus-within:ring-1">
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
      <button
        className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-md p-3 cursor-pointer disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? <div className="spinner" /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;

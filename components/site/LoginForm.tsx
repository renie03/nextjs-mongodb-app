"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { login } from "@/lib/actions/authActions";
import { toast } from "react-toastify";
import { loginSchema, LoginInputs } from "@/lib/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLoginForm: SubmitHandler<LoginInputs> = (data) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      onSubmit={handleSubmit(handleLoginForm)}
      className="flex flex-col gap-5"
    >
      <h1 className="text-lg font-medium text-center">Login</h1>
      <div>
        <input
          className="border border-borderColor rounded-md p-3 w-full aria-invalid:border-red-500 aria-invalid:ring-red-500"
          type="text"
          placeholder="Username"
          autoFocus
          aria-invalid={!!errors.username}
          {...register("username")}
        />
        {errors.username?.message && (
          <p className="text-red-500 text-sm">{errors.username?.message}</p>
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
            {...register("password")}
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
      <button
        className="bg-blue-600 dark:bg-blue-700 text-white rounded-md p-3 cursor-pointer enabled:hover:bg-blue-700 enabled:dark:hover:bg-blue-600 enabled:active:scale-98 enabled:active:opacity-70 disabled:cursor-not-allowed disabled:opacity-70 transition-all duration-200"
        disabled={isPending}
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="spinner" />
            <span>Logging in...</span>
          </div>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginForm;

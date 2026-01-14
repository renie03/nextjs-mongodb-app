"use client";

import { logout } from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const LogoutForm = () => {
  const [state, formAction, isPending] = useActionState(logout, {
    success: false,
    message: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/");
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form className="flex-1" action={formAction}>
      <button
        className="w-full p-1 bg-green-600 dark:bg-green-700 hover:bg-green-700 hover:dark:bg-green-800 text-white rounded-md font-medium cursor-pointer disabled:cursor-not-allowed disabled:bg-green-400 dark:disabled:bg-green-500"
        disabled={isPending}
      >
        {isPending ? <div className="spinner" /> : "Logout"}
      </button>
    </form>
  );
};

export default LogoutForm;

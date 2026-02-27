import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { githubLogin, googleLogin } from "@/lib/actions/authActions";
import SubmitButton from "@/components/shared/SubmitButton";
import LoginForm from "@/components/site/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="border border-borderColor rounded-lg p-5 w-80 flex flex-col gap-3">
        <LoginForm />
        <div className="flex items-center">
          <hr className="flex-1 border-t border-borderColor" />
          <span className="px-3 text-center">or</span>
          <hr className="flex-1 border-t border-borderColor" />
        </div>
        <form action={googleLogin}>
          <SubmitButton
            text="Signin with Google"
            icon={<FcGoogle size={20} />}
            className="bg-slate-100 dark:bg-slate-200 text-black rounded-md p-3 w-full flex items-center justify-center gap-2 cursor-pointer h-12 enabled:hover:bg-slate-200 enabled:dark:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </form>
        <form action={githubLogin}>
          <SubmitButton
            text="Signin with Github"
            icon={<FaGithub size={20} />}
            className="bg-slate-100 dark:bg-slate-200 text-black rounded-md p-3 w-full flex items-center justify-center gap-2 cursor-pointer h-12 enabled:hover:bg-slate-200 enabled:dark:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </form>
        <span className="text-sm text-textSoft">
          Don&apos;t have an account?
          <Link href="/register" className="ml-1 underline">
            Register
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;

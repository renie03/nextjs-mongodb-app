import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { githubLogin, googleLogin } from "@/lib/actions/userActions";
import SubmitButton from "@/components/shared/SubmitButton";
import LoginForm from "@/components/site/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="border border-borderColor rounded-lg p-5 w-80">
        <LoginForm />
        <h1 className="text-center mb-3 mt-1">or</h1>
        <form action={googleLogin}>
          <SubmitButton
            text="Signin with Google"
            icon={<FcGoogle size={20} />}
            className="bg-slate-200 dark:bg-white hover:bg-slate-300 text-black rounded-md p-3 w-full flex items-center justify-center gap-2 cursor-pointer h-12 disabled:cursor-not-allowed"
          />
        </form>
        <form action={githubLogin} className="mt-3">
          <SubmitButton
            text="Signin with Github"
            icon={<FaGithub size={20} />}
            className="bg-slate-200 dark:bg-white hover:bg-slate-300 text-black rounded-md p-3 w-full flex items-center justify-center gap-2 cursor-pointer h-12 disabled:cursor-not-allowed"
          />
        </form>
        <span className="text-sm text-textSoft mt-3">
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

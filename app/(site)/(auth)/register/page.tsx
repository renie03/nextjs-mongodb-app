import RegisterForm from "@/components/site/RegisterForm";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="border border-borderColor rounded-lg p-5 w-80 flex flex-col gap-3">
        <RegisterForm />
        <span className="text-sm text-textSoft">
          Do you have an account?
          <Link href="/login" className="ml-1 underline">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;

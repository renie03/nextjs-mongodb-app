import RegisterForm from "@/components/site/RegisterForm";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="border border-borderColor rounded-lg p-5 w-80">
        <RegisterForm />
        <p className="text-sm text-textSoft text-center mt-5">
          Do you have an account?
          <Link
            href="/login"
            className="ml-1 underline active:opacity-70 transition-all duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

import { handleLogout } from "@/lib/actions/userActions";

const LogoutButton = () => {
  return (
    <form className="flex-1" action={handleLogout}>
      <button className="w-full p-1 bg-green-600 dark:bg-green-700 hover:bg-green-700 hover:dark:bg-green-800 rounded-md font-medium cursor-pointer disabled:cursor-not-allowed">
        Logout
      </button>
    </form>
  );
};

export default LogoutButton;

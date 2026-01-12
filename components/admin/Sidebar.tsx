import { auth } from "@/lib/auth";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
} from "react-icons/md";
import SidebarLink from "./SidebarLink";
import AdminUserMenu from "./AdminUserMenu";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: <MdDashboard size={20} />,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: <MdSupervisedUserCircle size={20} />,
      },
      {
        title: "Posts",
        path: "/admin/posts",
        icon: <MdShoppingBag size={20} />,
      },
      {
        title: "Transactions",
        path: "",
        icon: <MdAttachMoney size={20} />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "",
        icon: <MdWork size={20} />,
      },
      {
        title: "Reports",
        path: "",
        icon: <MdAnalytics size={20} />,
      },
      {
        title: "Teams",
        path: "",
        icon: <MdPeople size={20} />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "",
        icon: <MdOutlineSettings size={20} />,
      },
      {
        title: "Help",
        path: "",
        icon: <MdHelpCenter size={20} />,
      },
    ],
  },
];

const Sidebar = async () => {
  const session = await auth();

  return (
    <div className="bg-bgSoft p-5 w-max md:w-75 h-screen flex flex-col justify-between sticky top-0">
      <div>
        <AdminUserMenu session={session} />
        <hr className="border-borderColor my-5" />
        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <li className="flex flex-col" key={item.title}>
              <span className="text-textSoft font-bold text-sm text-center md:text-start">
                {item.title}
              </span>
              {item.list.map((link) => (
                <SidebarLink key={link.title} link={link} />
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

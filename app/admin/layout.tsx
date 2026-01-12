import { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        <Topbar />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;

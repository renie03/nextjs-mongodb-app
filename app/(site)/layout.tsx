import { ReactNode } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full flex-1 max-w-5xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto px-5">
        {children}
      </div>
      <div className="w-full max-w-5xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto px-5">
        <Footer />
      </div>
    </div>
  );
};

export default SiteLayout;

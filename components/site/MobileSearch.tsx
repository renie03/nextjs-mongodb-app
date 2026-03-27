"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Search from "./Search";

const MobileSearch = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        className="pr-1 cursor-pointer active:opacity-70 transition-all duration-200"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaSearch size={20} />
      </button>
      {open && (
        <div className="absolute top-17 left-0 w-full px-5 bg-bg">
          <Search />
        </div>
      )}
    </div>
  );
};

export default MobileSearch;

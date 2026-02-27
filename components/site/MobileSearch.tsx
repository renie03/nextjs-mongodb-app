"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Search from "./Search";

const MobileSearch = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden mr-2">
      <button
        className="pr-1 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaSearch />
      </button>
      {open && (
        <div className="absolute top-17 left-0 w-full bg-bg">
          <Search />
        </div>
      )}
    </div>
  );
};

export default MobileSearch;

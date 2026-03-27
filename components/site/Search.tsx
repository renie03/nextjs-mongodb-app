"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [q, setQ] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setQ(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimQuery = q.trim();

    if (trimQuery) {
      router.push(`/search?q=${trimQuery}`);
    }
  };

  return (
    <form
      className="border border-borderColor rounded-lg py-1.5 px-1 flex items-center justify-between gap-2 focus-within:ring-focusColor focus-within:ring-1"
      onSubmit={handleSearch}
    >
      <input
        className="w-full ring-0 pl-1.5"
        type="text"
        placeholder="Search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="pr-1 cursor-pointer active:opacity-70 transition-all duration-200">
        <FaSearch size={20} />
      </button>
    </form>
  );
};

export default Search;

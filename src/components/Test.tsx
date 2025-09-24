"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const Test = () => {
  const [desc, setDesc] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close modal when clicking outside
  useEffect(() => {
    if (!openModal) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(desc);
    setOpenModal(false);
  };

  return (
    <div>
      <button
        className="bg-blue-500 rounded-md p-1 cursor-pointer"
        onClick={() => setOpenModal((prev) => !prev)}
      >
        Open Modal
      </button>
      {openModal && (
        <div
          className="border p-5 rounded-xl mt-5 flex flex-col"
          ref={modalRef}
        >
          <span
            className="self-end cursor-pointer"
            onClick={() => setOpenModal(false)}
          >
            X
          </span>
          <form onSubmit={handleSubmit}>
            <input
              className="border border-gray-300 rounded-md p-3 w-full focus:ring-black focus:ring-1"
              type="text"
              placeholder="Title"
              onChange={(e) => setDesc(e.target.value)}
              autoFocus
            />
            <button className="bg-blue-500 rounded-md p-1 cursor-pointer mt-2">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Test;

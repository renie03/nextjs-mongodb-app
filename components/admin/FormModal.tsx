"use client";

import { PostType } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import CreatePostForm from "./CreatePostForm";
import UpdatePostForm from "./UpdatePostForm";
import DeleteForm from "./DeleteForm";

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table: "post";
  type: "create" | "update" | "delete";
  data?: PostType;
  id?: string;
}) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close form when click outside or esc key
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <div>
      {/* BUTTON */}
      <button
        className={`py-1 px-2 rounded-md cursor-pointer capitalize ${
          type === "create"
            ? "bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white"
            : type === "update"
            ? "bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white"
            : "bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white"
        }`}
        onClick={() => setOpen(true)}
      >
        {type}
      </button>
      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center">
          <div
            className="bg-white rounded-lg p-5 min-w-80 flex flex-col gap-2 relative"
            ref={modalRef}
          >
            <button
              className="text-black cursor-pointer absolute top-1 right-3"
              onClick={() => setOpen(false)}
            >
              X
            </button>
            {/* Conditional Form */}
            {type === "create" && table === "post" && (
              <CreatePostForm setOpen={setOpen} />
            )}
            {type === "update" && table === "post" && data && (
              <UpdatePostForm setOpen={setOpen} post={data} />
            )}
            {type === "delete" && table === "post" && id && (
              <DeleteForm setOpen={setOpen} id={id} table="post" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;

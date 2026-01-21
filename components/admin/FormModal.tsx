"use client";

import { PostType, UserType } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import CreatePostForm from "./CreatePostForm";
import UpdatePostForm from "./UpdatePostForm";
import DeleteForm from "./DeleteForm";
import { deletePost } from "@/lib/actions/postActions";
import { deleteUser } from "@/lib/actions/userActions";
import CreateUserForm from "./CreateUserForm";
import UpdateUserForm from "./UpdateUserForm";

type FormModalProps =
  | {
      table: "post";
      type: "create" | "update" | "delete";
      data?: PostType;
      id?: string;
    }
  | {
      table: "user";
      type: "create" | "update" | "delete";
      data?: UserType;
      id?: string;
    };

const FormModal = ({ table, type, data, id }: FormModalProps) => {
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
            ? "bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white"
            : type === "update"
              ? "bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white"
              : "bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 text-white"
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

            {/* POSTS */}
            {table === "post" && type === "create" && (
              <CreatePostForm setOpen={setOpen} />
            )}
            {table === "post" && type === "update" && data && (
              <UpdatePostForm setOpen={setOpen} post={data} />
            )}
            {table === "post" && type === "delete" && id && (
              <DeleteForm
                table="post"
                setOpen={setOpen}
                id={id}
                action={deletePost}
              />
            )}

            {/* USERS */}
            {table === "user" && type === "create" && (
              <CreateUserForm setOpen={setOpen} />
            )}
            {table === "user" && type === "update" && data && (
              <UpdateUserForm setOpen={setOpen} user={data} />
            )}
            {table === "user" && type === "delete" && id && (
              <DeleteForm
                table="user"
                setOpen={setOpen}
                id={id}
                action={deleteUser}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;

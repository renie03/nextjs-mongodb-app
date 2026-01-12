"use client";

import { useState } from "react";
import CreatePostForm from "./CreatePostForm";

const Modal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="bg-blue-500 p-1 rounded-md"
        onClick={() => setOpen((prev) => !prev)}
      >
        Create
      </button>
      {open && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-lg p-5 w-80 flex flex-col gap-2 relative">
            <CreatePostForm setOpen={setOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

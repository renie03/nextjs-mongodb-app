"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

type DeleteActionProps = (
  previousState: { success: boolean; message: string },
  formData: FormData
) => Promise<{ success: boolean; message: string }>;

const DeleteForm = ({
  table,
  setOpen,
  id,
  action,
}: {
  table: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  action: DeleteActionProps;
}) => {
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, setOpen, router]);

  return (
    <>
      <span className="text-center font-medium text-black mt-3 mb-1">
        Are you sure you want to delete this {table}?
      </span>
      <div className="flex items-center justify-center gap-3">
        <form action={formAction} className="flex flex-col items-center">
          <input type="hidden" name="id" value={id} />
          <button
            className="w-16 h-8 bg-red-600 hover:bg-red-700 text-white rounded-md cursor-pointer disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? <div className="spinner" /> : "Delete"}
          </button>
        </form>
        <button
          className="w-16 h-8 bg-gray-600 hover:bg-gray-700 text-white rounded-md cursor-pointer"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default DeleteForm;

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const AddCommentForm = ({ postId }: { postId: string }) => {
  const [desc, setDesc] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const emojiRef = useRef<HTMLDivElement | null>(null);

  const handleEmojiClick = (e: EmojiClickData) => {
    setDesc((prev) => prev + e.emoji);
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    if (!openEmoji) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setOpenEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openEmoji]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment: { postId: string; desc: string }) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments`,
        newComment,
      );
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setDesc("");
      inputRef.current?.blur();
      setFocused(false);
      toast.success(res.data);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error((error.response?.data as string) || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ postId, desc });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input type="hidden" name="postId" value={postId} />
      <input
        className="ring-0 border-b border-borderColor focus:border-focusColor w-full text-sm"
        type="text"
        name="desc"
        placeholder="Add a comment..."
        required
        onChange={(e) => setDesc(e.target.value)}
        ref={inputRef}
        value={desc}
        onFocus={() => setFocused(true)}
      />
      {focused && (
        <div className="flex items-center justify-between">
          {/* emoji */}
          <div className="relative" ref={emojiRef}>
            <div
              className="cursor-pointer text-xl"
              onClick={() => setOpenEmoji((prev) => !prev)}
            >
              😊
            </div>
            {openEmoji && (
              <div className="absolute left-0 bottom-16">
                <EmojiPicker
                  height={350}
                  onEmojiClick={handleEmojiClick}
                  searchDisabled={true}
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <button
              className="w-16 h-8 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-md cursor-pointer"
              type="button"
              onClick={() => {
                setDesc("");
                setFocused(false);
              }}
            >
              Cancel
            </button>
            <button
              className="w-21 h-8 bg-blue-600 dark:bg-blue-700 text-white rounded-md cursor-pointer enabled:hover:bg-blue-700 enabled:dark:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={mutation.isPending || desc.trim() === ""}
            >
              {mutation.isPending ? <div className="spinner" /> : "Comment"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default AddCommentForm;

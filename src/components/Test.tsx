"use client";

import { CloudinaryResultInfo } from "@/types/types";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const Test = () => {
  const [avatar, setAvatar] = useState<CloudinaryResultInfo | null>(null);
  console.log(avatar?.secure_url);

  return (
    <div className="flex flex-col">
      {/* PREVIEW IMAGE */}
      {avatar?.secure_url && (
        <div className="self-center relative">
          <Image
            src={avatar.secure_url}
            alt="selected profile picture"
            width={48}
            height={48}
            className="h-12 w-12 object-cover rounded-full mb-1"
            placeholder="blur"
            blurDataURL="/blur.jpg"
          />
          <div
            className="absolute -top-1 right-0 cursor-pointer bg-bgSoft bg-opacity-50 dark:text-white h-4 w-4 rounded-full flex items-center justify-center text-xs"
            onClick={() => setAvatar(null)}
          >
            X
          </div>
        </div>
      )}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        // onSuccess={(result) => console.log(result)}
        onSuccess={(result, { widget }) => {
          setAvatar(result.info as CloudinaryResultInfo);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div
              className="flex items-center gap-2 cursor-pointer text-textSoft text-sm"
              onClick={() => open()}
            >
              <IoCloudUploadOutline size={20} />
              <span>Upload a photo</span>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default Test;

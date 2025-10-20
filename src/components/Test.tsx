"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const Test = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  console.log(avatar);

  return (
    <div className="flex flex-col">
      {/* PREVIEW IMAGE */}
      {avatar && (
        <div className="self-center relative">
          <Image
            src={avatar}
            alt="user profile picture"
            width={48}
            height={48}
            className="h-12 w-12 object-cover rounded-full mb-1"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcs3j9fwAGwALvQexiRwAAAABJRU5ErkJggg=="
          />
          <div
            className="absolute -top-1 right-0 cursor-pointer bg-bgSoft dark:text-white h-4 w-4 rounded-full flex items-center justify-center text-xs"
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
          const info = result.info as { secure_url?: string };
          if (info?.secure_url) setAvatar(info.secure_url);
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

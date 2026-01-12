"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const ImageKitUpload = ({
  setState,
  setIsUploading,
}: {
  setState: React.Dispatch<React.SetStateAction<string | null>>;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const abortController = new AbortController();

  const authenticator = async () => {
    try {
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    const file = fileInput.files[0];
    setIsUploading(true);
    setUploading(true);
    setProgress(0);

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      setIsUploading(false);
      setUploading(false);
      setProgress(0);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        // useUniqueFileName: true,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.signal,
      });
      // console.log("Upload response:", uploadResponse);
      setState(uploadResponse.url || null);
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Upload error:", error);
      }
    } finally {
      setIsUploading(false);
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <>
      {/* PROGRESS BAR */}
      {uploading && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-gray-600 text-center">
            {Math.round(progress)}%
          </div>
        </div>
      )}
      {/* UPLOAD */}
      <label
        className="flex items-center gap-2 cursor-pointer text-gray-500 text-sm"
        htmlFor="file"
      >
        <IoCloudUploadOutline size={20} />
        <span>Upload a photo</span>
      </label>
      <input
        type="file"
        id="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
      />
    </>
  );
};

export default ImageKitUpload;

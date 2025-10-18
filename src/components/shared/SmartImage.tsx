"use client";

import { useState } from "react";
import Image from "next/image";

const SmartImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[2/1] rounded-md overflow-hidden">
      {/* Main Image */}
      <Image
        src={src}
        alt={alt}
        fill
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-300 ease-in-out object-cover rounded-xl ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Shimmer placeholder */}
      {!loaded && (
        <div className="absolute inset-0 rounded-md overflow-hidden bg-gray-300 dark:bg-gray-700">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-[shimmer_2s_infinite]" />
        </div>
      )}
    </div>
  );
};

export default SmartImage;

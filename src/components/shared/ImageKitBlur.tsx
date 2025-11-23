"use client";

import { Image, buildSrc } from "@imagekit/next";
import { useState } from "react";

type ImageKitBlurProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
};

const ImageKitBlur = ({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  className,
}: ImageKitBlurProps) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      fill={fill}
      sizes={sizes}
      style={
        showPlaceholder
          ? {
              backgroundImage: `url(${buildSrc({
                urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
                src,
                transformation: [
                  // {}, // Any other transformation you want to apply
                  {
                    quality: 10,
                    blur: 90,
                  },
                ],
              })})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
      onLoad={() => {
        setShowPlaceholder(false);
      }}
    />
  );
};

export default ImageKitBlur;

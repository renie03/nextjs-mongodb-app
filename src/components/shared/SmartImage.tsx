"use client";

import { useState } from "react";
import Image from "next/image";

type SmartImageType = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  sizes?: string;
};

const SmartImage = ({
  src,
  width,
  height,
  alt,
  className,
  fill,
  sizes,
}: SmartImageType) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      src={src}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      onLoad={() => setLoaded(true)}
      className={`
          ${loaded ? "" : "bg-bgSoft"}					
          ${className}
        `}
      fill={fill}
      sizes={sizes}
    />
  );
};

export default SmartImage;

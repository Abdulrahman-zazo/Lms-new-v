"use client";

import { useState } from "react";
import Image from "next/image";
interface ImageProps {
  src: string;
  alt: string;
  width?: number | number;
  height?: number;
}
const ImageWithSkeleton = ({
  src,
  alt,
  width = 500,
  height = 400,
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="mx-auto"
      style={{
        width,
        height,
      }}
    >
      {/* Skeleton Placeholder */}
      {!isLoaded && !hasError && (
        <div
          className="animate-pulse bg-gray-200 rounded"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      )}

      {/* Actual Image */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="eager"
          priority // 👈 أضف هذا السطر
          quality={90}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className="mx-auto h-full object-contain"
          style={{
            display: isLoaded ? "block" : "none",
          }}
        />
      )}

      {/* If image failed to load */}
      {hasError && (
        <div className="text-center text-red-500 p-4">
          ❌ Failed to load image
        </div>
      )}
    </div>
  );
};

export default ImageWithSkeleton;

"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK_IMAGE = "/images/product-placeholder.png";

type Props = {
  src: string | null;
  productTitle: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export default function ProductImage(props: Props) {
  return <ProductImageWithFallback key={props.src} {...props} />;
}

function ProductImageWithFallback({
  src,
  productTitle,
  sizes,
  className = "object-contain",
  priority = false,
}: Props) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE);

  const isFallback = imageSrc === FALLBACK_IMAGE;
  const isRemoteImage = imageSrc.startsWith("http");

  return (
    <Image
      src={imageSrc}
      alt={
        isFallback
          ? `Geen afbeelding beschikbaar voor ${productTitle}`
          : productTitle
      }
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={isRemoteImage}
      onError={() => {
        if (!isFallback) {
          setImageSrc(FALLBACK_IMAGE);
        }
      }}
      className={className}
    />
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const Photo = ({
  src = "/img/example_photo.jpg",
  onImageLoad,
}: {
  src?: string;
  onImageLoad: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
  }, [src]);

  const handleImageLoad = () => {
    setLoading(false);
    onImageLoad();
  };

  return (
    <div>
      <Image
        src={src}
        width={400}
        height={400}
        priority={true}
        alt={
          src != "/img/example_photo.jpg"
            ? "Example de photo de profile correcte"
            : "Votre photo uploadé sur nos serveurs"
        }
        className="rounded-xl border-2 border-gray"
        sizes="100%"
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default Photo;

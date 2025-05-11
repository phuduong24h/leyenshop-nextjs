'use client';

import { useEffect, useState } from 'react';

const ImageGallery = ({ images }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    if (images?.[0]?.url) {
      setImage(images?.[0]?.url);
    }
  }, [images]);

  const renderImage = (item, index) => {
    const { url } = item || {};
    return (
      <div
        className="size-20 shrink-0 cursor-pointer overflow-hidden rounded border transition-transform duration-200 hover:scale-105"
        onMouseEnter={() => setImage(url)}>
        <img src={url} alt={`Thumb ${index}`} className="size-full object-contain" />
      </div>
    );
  };

  return (
    <div className="w-full max-w-[300px] self-center">
      <div className="mb-2 aspect-square w-full overflow-hidden rounded border">
        <img src={image} alt="product" className="size-full object-contain transition duration-300 ease-in-out" />
      </div>
      <div className="flex items-center gap-2 overflow-y-auto py-1">{images?.map?.(renderImage)}</div>
    </div>
  );
};

export default ImageGallery;

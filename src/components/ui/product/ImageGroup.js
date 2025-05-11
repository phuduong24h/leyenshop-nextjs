'use client';

import React, { useMemo, useState } from 'react';

import { Image } from 'antd';

const ImageList = ({ images, max = 5 }) => {
  const [visible, setVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const visibleImages = useMemo(() => images?.slice?.(0, max), [images, max]);

  const handlePreviewImage = () => {
    setPreviewIndex(max - 1);
    setVisible(true);
  };

  const renderImage = (item, index) => {
    const { url } = item || {};
    return <Image key={index} src={url} preview={{ visible: false }} className="hidden" />;
  };

  const renderVisibleImage = (item, index) => {
    const { url } = item || {};

    const count = (images?.length || 0) - max;
    const hasCount = index + 1 === max && images?.length > max;

    return (
      <div className="relative">
        <Image key={index} width={80} height={80} src={url} style={{ objectFit: 'cover' }} preview={false} />
        {hasCount && (
          <div
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 text-lg font-semibold text-text-secondary"
            aria-hidden
            onClick={handlePreviewImage}>
            +{count}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex w-full flex-wrap items-center gap-2">{visibleImages?.map?.(renderVisibleImage)}</div>
      <Image.PreviewGroup
        preview={{
          visible,
          onVisibleChange: value => setVisible(value),
          current: previewIndex,
          onChange: index => setPreviewIndex(index)
        }}>
        {images?.map?.(renderImage)}
      </Image.PreviewGroup>
    </>
  );
};

export default ImageList;

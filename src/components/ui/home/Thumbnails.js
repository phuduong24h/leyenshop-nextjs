'use client';

import Image from 'next/image';

import { useConfigStore } from 'hooks/store';

const Thumbnails = () => {
  const bannerPinned = useConfigStore(state => state.bannerPinned);

  const renderItem = (item, index) => {
    return (
      <Image
        key={index}
        src={item?.file?.url}
        alt="banner"
        width={0}
        height={0}
        sizes="100vw"
        className="flex-1 border border-border-primary object-cover shadow-xl"
      />
    );
  };

  return (
    <div className="my-[50px] hidden h-[202px] gap-5 sm:flex">{bannerPinned?.slice?.(0, 3)?.map?.(renderItem)}</div>
  );
};

export default Thumbnails;

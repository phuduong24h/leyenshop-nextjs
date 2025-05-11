'use client';

import Image from 'next/image';

import { Icons } from 'assets';

const Empty = () => {
  return (
    <div className="my-4 flex flex-1 flex-col items-center justify-center gap-3 self-center">
      <Image src={Icons.empty} alt="empty" width={145} height={119} />
      <span className="text-xl">Không có dữ liệu</span>
    </div>
  );
};

export default Empty;

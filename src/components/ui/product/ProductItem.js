'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from 'components/form';
import { VND } from 'constants/common';
import { Routes } from 'routes';
import { formatMoney } from 'utils';

const ProductItem = ({ data, onAddCart }) => {
  const router = useRouter();

  const { id, name, price, category, files } = data || {};
  const { name: nameCategory } = category || {};
  const { url } = files?.[0] || {};

  const goDetail = () => router.push(Routes.CHI_TIET_SAN_PHAM.replace(':id', id));

  return (
    <div className="flex max-w-[200px] flex-col overflow-hidden border border-border-primary">
      <div aria-hidden onClick={goDetail}>
        <Image
          width={0}
          height={0}
          src={url}
          loading="lazy"
          className="h-[190px] w-full object-cover"
          alt={name}
          sizes="100vw"
        />
        <div className="mb-1 flex flex-col items-center gap-1 px-4 pt-1">
          <span className="text-xs text-text-secondary">{nameCategory}</span>
          <span className="line-clamp-1 text-lg font-semibold">{name}</span>
          <span className="flex font-medium text-state-error">
            <span className="max-w-[100px] truncate">{formatMoney(price)}</span>
            <span className="underline">{VND}</span>
          </span>
        </div>
      </div>
      <Button className="mx-4 mb-3.5 flex-1" label="Thêm vào giỏ hàng" size="sm" onClick={() => onAddCart?.(data)} />
    </div>
  );
};

export default ProductItem;

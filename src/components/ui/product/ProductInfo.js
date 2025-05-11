'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';
import { LuShoppingCart } from 'react-icons/lu';
import { toast } from 'sonner';

import { Button } from 'components/form';
import { VND } from 'constants/common';
import { useCartStoreActions } from 'hooks/store';
import { cn, formatMoney } from 'utils';

import { Quantity } from '../home';

const ProductInfo = ({ data }) => {
  const { addCart } = useCartStoreActions();

  const [quantity, setQuantity] = useState(1);
  const [colorId, setColorId] = useState();
  const [sizeId, setSizeId] = useState();

  const { name, price, colors, sizes, files } = data || {};

  const handleAddToCart = () => {
    addCart({
      id: data?.id,
      name,
      files,
      price,
      quantity,
      colorId,
      sizeId
    });
    toast.success('Thêm vào giỏ hàng thành công');
  };

  const increaseCart = () => {
    setQuantity(prevCount => prevCount + 1);
  };

  const decreaseCart = () => {
    setQuantity(prevCount => prevCount - 1);
  };

  const handleSelectColor = id => () => {
    setColorId(prev => (prev === id ? undefined : id));
  };

  const handleSelectSize = id => () => {
    setSizeId(prev => (prev === id ? undefined : id));
  };

  const disabled = useMemo(
    () => (colors?.length && !colorId) || (sizes?.length && !sizeId),
    [colorId, colors, sizeId, sizes]
  );

  const renderColorItem = item => {
    const { id: colorItemId, name: nameColor, files: filesColor } = item || {};
    const { url } = filesColor?.[0] || {};

    const isActive = colorItemId === colorId;

    return (
      <button
        type="button"
        className={cn(
          'flex items-center justify-center gap-2 overflow-hidden rounded border border-border-primary p-1.5',
          isActive && 'bg-secondary-active'
        )}
        onClick={handleSelectColor(colorItemId)}>
        <Image src={url} width={24} height={0} sizes="100vh" />
        <p>{nameColor}</p>
      </button>
    );
  };

  const renderSizeItem = item => {
    const { id: sizeItemId, name: nameSize } = item || {};

    const isActive = sizeItemId === sizeId;

    return (
      <button
        type="button"
        className={cn(
          'flex items-center justify-center gap-2 overflow-hidden rounded border border-border-primary p-1.5',
          isActive && 'bg-secondary-active'
        )}
        onClick={handleSelectSize(sizeItemId)}>
        <p>{nameSize}</p>
      </button>
    );
  };

  return (
    <div>
      <div className="text-lg font-medium">{name}</div>
      <div className="mt-2 text-base font-bold text-state-error md:mt-4">
        <span>{formatMoney(price)}</span>
        <span className="underline">{VND}</span>
      </div>
      <div className="mt-2 flex flex-col gap-2 md:mt-7 md:gap-7">
        <div className="flex flex-col gap-1 md:flex-row">
          <p className="min-w-20 text-text-secondary md:my-0">Màu sắc</p>
          <div className="md:gap4 flex flex-wrap items-center gap-2">{colors?.map?.(renderColorItem)}</div>
        </div>
        <div className="flex flex-col gap-1 md:flex-row">
          <p className="min-w-20 text-text-secondary md:my-0">Size</p>
          <div className="md:gap4 flex flex-wrap items-center gap-2">{sizes?.map?.(renderSizeItem)}</div>
        </div>
        <div className="flex flex-col gap-1 md:flex-row">
          <p className="min-w-20 text-text-secondary md:my-0">Số lượng</p>
          <Quantity onDecrease={decreaseCart} onIncrease={increaseCart} value={quantity} />
        </div>
      </div>
      <div className="mt-6 flex w-full items-center justify-center">
        <Button
          variant="outline"
          className="flex items-center gap-x-2 text-nowrap"
          disabled={disabled}
          onClick={handleAddToCart}>
          <LuShoppingCart size={16} />
          <p className="text-base">Thêm giỏ hàng</p>
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;

'use client';

import { useState } from 'react';

import { ProductItem, ProductModal } from 'components/ui';
import { useCategoryFeaturedList } from 'hooks/api';
import { useFlag } from 'hooks/base';

const Products = () => {
  const { data: { data } = {} } = useCategoryFeaturedList();

  const [visibleProduct, onShowProduct, onHideProduct] = useFlag();

  const [product, setProduct] = useState();

  const handleAddToCart = value => {
    setProduct(value);
    onShowProduct();
  };

  const renderItem = (item, index) => {
    return <ProductItem key={index} data={item} onAddCart={handleAddToCart} />;
  };

  const renderProduct = item => {
    const { id, category, products } = item || {};
    const { name } = category || {};

    if (!products?.length) {
      return null;
    }

    return (
      <div key={id} className="mb-[30px]">
        <div className="mb-[30px] flex items-center justify-center">
          <div className="h-px max-w-[200px] flex-1 bg-primary" />
          <div className="mx-[30px] text-3xl font-bold">{name}</div>
          <div className="h-px max-w-[200px] flex-1 bg-primary" />
        </div>
        <div className="product-grid">{products?.slice?.(0, 5)?.map?.(renderItem)}</div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4 py-4">{data?.map?.(renderProduct)}</div>
      <ProductModal open={visibleProduct} onOpenChange={onHideProduct} product={product} />
    </>
  );
};

export default Products;

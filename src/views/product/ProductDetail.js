'use client';

import { BreadCrumbs } from 'components/common';
import { ProductContent } from 'components/ui';
import { useProductDetail } from 'hooks/api';
import { Routes } from 'routes';

const ProductDetail = ({ id }) => {
  const { data: { data } = {}, isError } = useProductDetail(id);

  const BREAD_CRUMB_ITEMS = [
    {
      title: 'Trang chủ',
      href: Routes.TRANG_CHU
    },
    {
      title: 'Sản phẩm',
      href: Routes.SAN_PHAM
    },
    {
      title: data?.name || 'N/A',
      isActive: true
    }
  ];

  const render = () => {
    if (isError) {
      return <div>Error</div>;
    }

    return <ProductContent data={data} />;
  };

  return (
    <div className="h-full">
      <BreadCrumbs items={BREAD_CRUMB_ITEMS} />
      {render()}
    </div>
  );
};

export default ProductDetail;

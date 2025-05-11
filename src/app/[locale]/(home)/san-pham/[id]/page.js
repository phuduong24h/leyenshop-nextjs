'use client';

import ProductDetail from 'views/product/ProductDetail';

const ProductDetailPage = ({ params }) => {
  const { id } = params || {};

  return <ProductDetail id={id} />;
};

export default ProductDetailPage;

import { Dialog } from 'components/common';

import ProductContent from './ProductContent';

const ProductModal = ({ open, onOpenChange, product }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Thông tin sản phẩm" hideFooter>
      <ProductContent data={product} />
    </Dialog>
  );
};

export default ProductModal;

import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';

const ProductContent = ({ data }) => {
  const { description, detail, files } = data || {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:gap-7">
        <ImageGallery images={files} />
        <ProductInfo data={data} />
      </div>
      <div>
        <p className="text-2xl font-bold">CHI TIẾT SẢN PHẨM</p>
        <div dangerouslySetInnerHTML={{ __html: detail }} />
      </div>
      <div>
        <p className="text-2xl font-bold">MÔ TẢ SẢN PHẨM</p>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};

export default ProductContent;

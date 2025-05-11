'use client';

import { useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { IoSearch } from 'react-icons/io5';

import { BreadCrumbs, Empty, LoadMoreButton } from 'components/common';
import { Select, TextInput } from 'components/form';
import { ProductItem, ProductModal } from 'components/ui';
import { useCategoryList, useProductInfinite } from 'hooks/api';
import { useDebounce, useFlag } from 'hooks/base';
import { Routes } from 'routes';

const BREAD_CRUMB_ITEMS = [
  {
    title: 'Trang chủ',
    href: Routes.TRANG_CHU
  },
  {
    title: 'Sản phẩm',
    isActive: true
  }
];

const SORT_OPTIONS = [
  {
    label: 'Mới nhất',
    value: 'createdAt:desc'
  },
  {
    label: 'Cũ nhất',
    value: 'createdAt:asc'
  },
  {
    label: 'Giá tăng dần',
    value: 'price:asc'
  },
  {
    label: 'Giá giảm dần',
    value: 'price:desc'
  }
];

const DEFAULT_CATEGORY = '-1';

const Product = () => {
  const searchParams = useSearchParams();

  const { data: { data: categories } = {} } = useCategoryList();

  const [visibleProduct, onShowProduct, onHideProduct] = useFlag();

  const [search, setSearch] = useState(searchParams.get('search'));

  const [categoryId, setCategoryId] = useState(DEFAULT_CATEGORY);
  const [sort, setSort] = useState(SORT_OPTIONS[0].value);

  const [product, setProduct] = useState();

  const searchDebounce = useDebounce(search);

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCategoryId(searchParams.get('categoryId') || DEFAULT_CATEGORY);
  }, [searchParams]);

  const { data, hasNextPage, loadMore, isFetchingNextPage, isLoading } = useProductInfinite({
    search: searchDebounce,
    sorts: [sort],
    categoryId: Number(categoryId) < 0 ? undefined : categoryId
  });

  const categoriesMapped = useMemo(() => {
    const arr = categories?.map?.(x => ({ label: x?.name, value: x?.id })) || [];
    return [{ label: 'Tất cả', value: DEFAULT_CATEGORY }, ...arr];
  }, [categories]);

  const onChangeSearch = e => {
    setSearch(e.target.value);
  };

  const handleAddToCart = value => {
    setProduct(value);
    onShowProduct();
  };

  const renderProduct = item => {
    const { id } = item || {};

    return <ProductItem key={id} data={item} onAddCart={handleAddToCart} />;
  };

  return (
    <>
      <BreadCrumbs items={BREAD_CRUMB_ITEMS} />
      <div className="flex flex-col gap-4 pb-5 md:flex-row md:items-center md:justify-between">
        <TextInput
          row
          title="Tìm kiếm"
          placeholder="Nhập tìm kiếm"
          value={search}
          onChange={onChangeSearch}
          right={<IoSearch size={20} color="var(--color-primary)" />}
          wrapperClassName="w-[180px]"
          rowClassName="md:flex-row md:items-center"
        />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-5">
          <Select
            row
            options={categoriesMapped}
            title="Loại"
            value={categoryId}
            onChange={setCategoryId}
            triggerClassName="w-[180px] md:w-[140px]"
            rowClassName="md:flex-row md:items-center"
          />
          <Select
            row
            options={SORT_OPTIONS}
            title="Sắp xếp"
            value={sort}
            onChange={setSort}
            triggerClassName="w-[180px] md:w-[140px]"
            rowClassName="md:flex-row md:items-center"
          />
        </div>
      </div>
      {data?.length ? <div className="product-grid mb-5">{data?.map(renderProduct)}</div> : <Empty />}
      <LoadMoreButton
        onClick={loadMore}
        isLoading={isLoading}
        isFetching={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
      <ProductModal open={visibleProduct} onOpenChange={onHideProduct} product={product} />
    </>
  );
};

export default Product;

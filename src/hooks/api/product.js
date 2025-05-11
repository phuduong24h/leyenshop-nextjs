import { API } from 'constants/common';
import { useBaseInfinite, useBasePagination, useBaseQuery } from 'hooks/base';

export const useProductPagination = params =>
  useBasePagination({ key: [API.PRODUCT.LIST, params], uri: API.PRODUCT.LIST, params });

export const useProductInfinite = params =>
  useBaseInfinite({ key: [API.PRODUCT.LIST, params], uri: API.PRODUCT.LIST, params });

export const useProductList = () => useBaseQuery({ key: [API.PRODUCT.LIST], uri: API.PRODUCT.LIST });

export const useProductDetail = (id, options) =>
  useBaseQuery({ key: [API.PRODUCT.DETAIL, id], uri: API.PRODUCT.DETAIL.replace(':id', id), options });

import { API } from 'constants/common';
import { useBaseMutation, useBaseQuery } from 'hooks/base';

export const useCreateOrder = () =>
  useBaseMutation({
    uri: API.ORDER.NEW
  });

export const useCheckProductExist = () => useBaseMutation({ uri: API.ORDER.CHECK_PRODUCT_EXIST });

export const useOrderHistory = params => useBaseQuery({ key: [API.ORDER.LIST, params], uri: API.ORDER.LIST, params });

export const useOrderHistoryDetail = id =>
  useBaseQuery({ key: [API.ORDER.DETAIL, id], uri: API.ORDER.DETAIL.replace(':id', id) });

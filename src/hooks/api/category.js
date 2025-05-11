import { API } from 'constants/common';
import { useBaseQuery } from 'hooks/base';

export const useCategoryList = params =>
  useBaseQuery({
    key: [API.CATEGORY.LIST, params],
    uri: API.CATEGORY.LIST,
    params
  });

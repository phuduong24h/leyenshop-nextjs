import { API } from 'constants/common';
import { useBaseQuery } from 'hooks/base';

export const useCategoryFeaturedList = () =>
  useBaseQuery({
    key: [API.CATEGORY_FEATURED.LIST],
    uri: API.CATEGORY_FEATURED.LIST
  });

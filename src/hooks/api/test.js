import { API } from 'constants/common';
import { useBasePagination } from 'hooks/base';

export const useTest = () =>
  useBasePagination({
    key: [API.TEST.LIST],
    uri: API.TEST.LIST
  });

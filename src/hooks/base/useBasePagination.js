import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { parseAsString, useQueryStates } from 'nuqs';

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGINATION_PAGE, instance, STALE_TIME } from 'constants/common';
import { deDuplicate } from 'utils';

export const useBasePagination = ({ uri, method = 'get', headers, params, body, field, options = {}, key }) => {
  if (!uri || !key) {
    throw new Error('Missing key or uri');
  }

  const [query, setQuery] = useQueryStates(
    {
      page: parseAsString.withDefault(DEFAULT_PAGINATION_PAGE),
      pageSize: parseAsString.withDefault(DEFAULT_PAGE_SIZE)
    },
    { history: 'replace' }
  );

  const queryKey = Array.isArray(key) ? [...key, query] : [key, query, { ...(params || {}) }];

  const result = useInfiniteQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await instance.request({
        url: uri,
        method,
        headers,
        params: {
          page: query.page - 1,
          pageSize: query.pageSize,
          ...params
        },
        data: body
      });
      return data;
    },
    select: prev => {
      const { pages = [] } = prev || {};
      const items = pages.flatMap(item => item.results || []);
      const iteratee = options?.iteratee || 'id';
      const pagesWithUniqueItems = deDuplicate([...items.flat()], iteratee);
      const lastPage = pages[(pages.length || 1) - 1];

      return {
        ...prev,
        pages: pagesWithUniqueItems,
        currentPage: lastPage?.currentPage,
        pageSize: lastPage?.pageSize,
        totalPages: lastPage?.totalPages || 0,
        total: lastPage?.total || 0,
        [field]: lastPage?.[field]
      };
    },
    getNextPageParam: lastPage =>
      lastPage?.hasNextPage || lastPage?.page < (lastPage?.totalPages || 0) - 1
        ? (lastPage?.currentPage || 0) + 1
        : false,
    staleTime: STALE_TIME,
    placeholderData: keepPreviousData,
    ...options
  });

  const pagination = {
    showSizeChanger: result?.data?.total > DEFAULT_PAGE_SIZE,
    onChange: (page, pageSize) =>
      setQuery({ page: page || DEFAULT_PAGINATION_PAGE, pageSize }, { shallow: true, scroll: false }),
    current: query?.page,
    pageSize: query?.pageSize,
    total: result?.data?.total,
    hideOnSinglePage: false
  };

  return {
    ...result,
    pagination,
    data: result?.data?.pages?.filter(Boolean),
    currentPage: result?.data?.currentPage || 0,
    pageSize: result?.data?.pageSize || DEFAULT_PAGE_SIZE,
    totalPages: result?.data?.totalPages || 0,
    [field]: result?.data?.[field]
  };
};

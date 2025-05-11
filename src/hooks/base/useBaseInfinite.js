import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_PAGE_SIZE, instance, STALE_TIME } from 'constants/common';
import { deDuplicate } from 'utils';

export const useBaseInfinite = ({ uri, method = 'get', headers, params, body, field, options = {}, key }) => {
  if (!uri || !key) {
    throw new Error('Missing key or uri');
  }

  const queryKey = Array.isArray(key) ? key : [key, { ...(params || {}) }];

  const result = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 0, pageSize = DEFAULT_PAGE_SIZE } = {}) => {
      const { data } = await instance.request({
        url: uri,
        method,
        headers,
        params: {
          page: pageParam,
          pageSize,
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
      lastPage?.hasNextPage || lastPage?.currentPage < (lastPage?.totalPages || 0) - 1
        ? (lastPage?.currentPage || 0) + 1
        : null,
    staleTime: STALE_TIME,
    ...options
  });

  const { hasNextPage, fetchNextPage } = result;

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage?.();
    }
  }, [hasNextPage]);

  return {
    ...result,
    data: result?.data?.pages?.filter(Boolean),
    currentPage: result?.data?.currentPage || 0,
    pageSize: result?.data?.pageSize || 0,
    totalPages: result?.data?.totalPages || 0,
    total: result?.data?.total || 0,
    [field]: result?.data?.[field],
    loadMore
  };
};

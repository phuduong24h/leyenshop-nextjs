import { useQuery } from '@tanstack/react-query';

import { instance } from 'constants/common';

export const useBaseQuery = ({ uri, method = 'get', headers, params, body, options = {}, key }) => {
  if (!key || !uri) {
    throw new Error('Missing key or uri');
  }

  const result = useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await instance.request({
        url: uri,
        method,
        headers,
        params,
        data: body
      });
      return data;
    },
    retry: false,
    ...options
  });

  return result;
};

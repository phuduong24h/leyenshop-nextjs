import { useMutation } from '@tanstack/react-query';

import { instance } from 'constants/common';
import { showCommonError } from 'utils';

import { useDebouncedCallback } from './useDebounce';

export const useBaseMutation = ({ uri, method = 'post', headers, onSuccess, onError, options = {} }) => {
  if (!uri) {
    throw new Error('Missing uri');
  }

  const result = useMutation({
    mutationFn: async ({ uriParams, params, ...body } = {}) => {
      let _uri = uri;
      if (typeof uriParams === 'object') {
        Object.keys(uriParams).forEach(key => {
          _uri = uri.replace(`:${key}`, uriParams[key]);
        });
      }

      const _body = method?.toLowerCase?.() === 'get' ? undefined : body;
      const { data } = await instance.request({
        url: _uri,
        method,
        headers,
        params,
        data: _body
      });
      return data;
    },
    onError: onError || showCommonError,
    onSuccess,
    ...options
  });

  const doRequest = useDebouncedCallback((body, _onSuccess, _onError) =>
    result.mutate(body, {
      onSuccess: _onSuccess,
      onError: _onError
    })
  );

  const doRequestAsync = useDebouncedCallback((body, _onSuccess, _onError) =>
    result.mutateAsync(body, {
      onSuccess: _onSuccess,
      onError: _onError
    })
  );

  return {
    ...result,
    doRequest,
    loading: result.isLoading,
    doRequestAsync
  };
};

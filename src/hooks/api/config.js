'use client';

import { useEffect } from 'react';

import { API } from 'constants/common';
import { useBaseQuery } from 'hooks/base';
import { useConfigStore } from 'hooks/store/config';

export const useGetConfig = () => {
  const { data: { data } = {}, isSuccess } = useBaseQuery({
    key: [API.CONFIG.CONFIG],
    uri: API.CONFIG.CONFIG
  });

  useEffect(() => {
    if (isSuccess) {
      useConfigStore.setState(state => ({
        ...state,
        ...data,
        info: {
          ...state.info,
          ...data.info
        },
        theme: {
          ...state.theme,
          ...data.theme
        }
      }));
    }
  }, [isSuccess]);
};

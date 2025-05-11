'use client';

import { useDebounce as useLibDebounce, useDebouncedCallback as useLibDebouncedCallback } from 'use-debounce';

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue] = useLibDebounce(value, delay);
  return debouncedValue;
};

// Trailing
export const useDebouncedCallback = (callback, wait = 350) => {
  return useLibDebouncedCallback(callback, wait, {
    leading: true,
    trailing: false
  });
};

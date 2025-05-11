'use client';

import { useMediaQuery } from 'react-responsive';

export const useBreakpoints = () => {
  const isDesktopOrTablet = useMediaQuery({
    query: '(min-width: 768px)'
  });
  const isSmallTabletOrMobile = useMediaQuery({
    query: '(max-width: 767px)'
  });

  const isDesktop = useMediaQuery({
    query: '(min-width: 1025px)'
  });
  const isTablet = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1024px)'
  });
  const isSmallTablet = useMediaQuery({
    query: '(min-width: 640px) and (max-width: 767px)'
  });
  const isMobile = useMediaQuery({
    query: '(max-width: 639px)'
  });

  return { isDesktopOrTablet, isSmallTabletOrMobile, isDesktop, isTablet, isSmallTablet, isMobile };
};

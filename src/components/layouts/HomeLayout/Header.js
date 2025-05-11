'use client';

import { HeaderMobile, HeaderDesktop } from 'components/ui';
import { useBreakpoints } from 'hooks/base';

const Header = () => {
  const { isSmallTabletOrMobile } = useBreakpoints();

  return <>{isSmallTabletOrMobile ? <HeaderMobile /> : <HeaderDesktop />}</>;
};

export default Header;

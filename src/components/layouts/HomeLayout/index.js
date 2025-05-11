'use client';

import { useBreakpoints } from 'hooks/base';

import Footer from './Footer';
import Header from './Header';

const HomeLayout = ({ children }) => {
  const { isDesktopOrTablet } = useBreakpoints();

  return (
    <div className="flex h-screen flex-col overflow-y-scroll">
      <Header />
      <div className="flex-1 bg-background-primary">
        <main className="container-responsive flex h-full flex-1 flex-col py-6">{children}</main>
      </div>
      {isDesktopOrTablet && <Footer />}
    </div>
  );
};

export default HomeLayout;

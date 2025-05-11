'use client';

import { AppProgressBar } from 'next-nprogress-bar';
import { Toaster } from 'sonner';

import { useGetConfig } from 'hooks/api';

const RootLayout = ({ children }) => {
  useGetConfig();

  return (
    <>
      <AppProgressBar height="2px" color="var(--secondary)" options={{ showSpinner: false }} shallowRouting />
      <Toaster position="top-center" richColors />
      {children}
    </>
  );
};

export default RootLayout;

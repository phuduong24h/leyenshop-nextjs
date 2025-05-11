import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';

import { AppProvider } from 'components/common';
import { RootLayout } from 'components/layouts';
import { NAME_APP } from 'constants/common';
import { cn } from 'utils';

export const metadata = {
  title: NAME_APP,
  description: ''
};

export default function LocaleLayout({ children, params }) {
  const locale = useLocale();

  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html suppressHydrationWarning lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen font-roboto')}>
        <AppProvider locale={locale}>
          <RootLayout>{children}</RootLayout>
        </AppProvider>
      </body>
    </html>
  );
}

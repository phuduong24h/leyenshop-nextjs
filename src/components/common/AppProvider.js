'use client';

import 'styles/css';
import 'constants/common/day';

import { notFound } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { AppStyles } from 'components/common';
import { ReactQueryProvider } from 'constants/common';
import { persistor, store } from 'stores';

export default async function AppProvider({ children, locale }) {
  let messages;
  try {
    messages = (await import(`lang/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <NuqsAdapter>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <ReactQueryProvider>
                <AppStyles>{children}</AppStyles>
              </ReactQueryProvider>
            </PersistGate>
          </Provider>
        </NuqsAdapter>
      </NextIntlClientProvider>
    </SessionProvider>
  );
}

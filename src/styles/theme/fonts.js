import { Roboto } from 'next/font/google';
import NextLocalFont from 'next/font/local';

export const robotoFontLocal = NextLocalFont({
  src: [
    {
      path: 'assets/fonts/Roboto-Regular.ttf',
      weight: '400'
    },
    {
      path: 'assets/fonts/Roboto-Medium.ttf',
      weight: '500'
    },
    {
      path: 'assets/fonts/Roboto-Bold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-roboto',
  display: 'swap'
});

export const robotoFont = Roboto({
  style: ['normal'],
  subsets: ['vietnamese'],
  display: 'swap'
});

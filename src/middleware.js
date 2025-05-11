import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';

import { Routes } from 'routes';

const PUBLIC_FILE = /\.(.*)$/;
const LOCALES = ['vi', 'en'];

const checkAuthPage = pathname => pathname?.toLowerCase?.()?.startsWith?.(Routes.DANG_NHAP);

const checkPublic = pathname =>
  pathname.startsWith('/_next') ||
  pathname.startsWith('/api') ||
  pathname.startsWith('/static') ||
  PUBLIC_FILE.test(pathname);

const intlMiddleware = createIntlMiddleware({
  locales: LOCALES,
  defaultLocale: 'vi',
  localeDetection: false,
  localePrefix: 'as-needed'
});

const authMiddleware = signInPage =>
  withAuth(req => intlMiddleware(req), {
    callbacks: {
      async authorized({ token }) {
        return !!token;
      }
    },
    pages: {
      signIn: signInPage
    }
  });

export default async function middleware(req) {
  const token = await getToken({ req });
  const url = req.nextUrl;
  const { pathname } = url || {};

  if (checkPublic(pathname)) {
    return intlMiddleware(req);
  }

  const isAuth = !!token;
  const isAuthPage = checkAuthPage(pathname);

  // if (!isAuthPage && !isAuth) {
  //   return authMiddleware(Routes.DANG_NHAP)(req);
  // }
  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL(Routes.TRANG_CHU, req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  unstable_allowDynamic: ['/node_modules/**'], // Allow dynamic imports from node_modules
  matcher: [
    // Exclude paths starting with /api, /_next/static, /_next/image, /icons, /images, or files containing a dot (e.g. favicon.ico)
    '/((?!api|_next/static|_next/image|icons|images|favicon\\.ico|.*\\..*).*)',
    // Match paths starting with /users, which may optionally have a locale prefix
    '/([\\w-]+)?/users/(.+)',
    // Match protected paths with or without a locale prefix
    '/:locale/protected/:path*',
    '/protected/:path*'
  ]
};

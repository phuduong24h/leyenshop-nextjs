import { NextResponse } from 'next/server';

export async function POST(req) {
  const url = new URL(req.url);

  const redirectPath = url.pathname?.replace('/api/callback', '/app/payment/');

  return NextResponse.redirect(new URL(redirectPath, req.url), 302);
}

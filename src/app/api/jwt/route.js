import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req) {
  const token = await getToken({ req });
  return NextResponse.json(token);
}

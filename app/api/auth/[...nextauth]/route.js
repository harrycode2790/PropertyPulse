import { authOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth/next';
import { NextResponse } from 'next/server';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig = {
  providers: [GoogleProvider],
} satisfies NextAuthConfig;

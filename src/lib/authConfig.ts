import { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig = {
  providers: [
    GoogleProvider({
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
} satisfies NextAuthConfig;

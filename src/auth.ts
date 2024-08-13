import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { authConfig } from './lib/authConfig';
import { getUserById } from './actions/user';

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in',
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt(token: any) {
      if (!token.token.sub) return token;
      const existingUser: any = await getUserById(token.token.sub);
      if (!existingUser) return token;
      return token.token;
    },
  },
  ...authConfig,
});

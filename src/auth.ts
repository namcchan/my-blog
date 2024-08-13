import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { getUserById } from './features/user/actions';

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
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
  providers: [],
});

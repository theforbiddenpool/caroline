import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../db/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => ({
      ...session,
      user: {
        id: user.id,
        ...session.user,
      },
    }),
  },
  secret: process.env.SECRET,
  debug: true,
};

export default NextAuth(authOptions);

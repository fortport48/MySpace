import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const authSecret = process.env.NEXTAUTH_SECRET || 'myspace-super-secret-auth-key-2026';

if (process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_SECRET) {
  throw new Error('CRITICAL SECURITY CONFIGURATION ERROR: NEXTAUTH_SECRET environment variable is missing.');
}

export const authOptions: NextAuthOptions = {
  secret: authSecret,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error('Please enter your email/username and password');
        }

        const identifier = credentials.identifier.trim().toLowerCase();

        // Search user by email OR username
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: identifier },
              { username: identifier },
            ],
          },
        });

        if (!user || !user.passwordHash) {
          throw new Error('Invalid email/username or password');
        }

        if (user.isSuspended) {
          throw new Error('Your account has been suspended by community moderation.');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          throw new Error('Invalid email/username or password');
        }

        // Bootstrap admin role for primary handle 'alex'
        const role = user.role || (user.username === 'alex' ? 'ADMIN' : 'USER');

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          image: user.profileImage || null,
          role: role,
          isSuspended: user.isSuspended,
          isVerified: user.isVerified,
          subscriptionPlan: user.subscriptionPlan || 'FREE',
          emailVerified: user.emailVerified,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
        token.emailVerified = (user as any).emailVerified;
        token.profileImage = user.image;
        token.role = (user as any).role || 'USER';
        token.isSuspended = (user as any).isSuspended || false;
        token.isVerified = (user as any).isVerified || false;
        token.subscriptionPlan = (user as any).subscriptionPlan || 'FREE';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).username = token.username;
        (session.user as any).emailVerified = token.emailVerified;
        (session.user as any).profileImage = token.profileImage;
        (session.user as any).role = token.role || 'USER';
        (session.user as any).isSuspended = token.isSuspended || false;
        (session.user as any).isVerified = token.isVerified || false;
        (session.user as any).subscriptionPlan = token.subscriptionPlan || 'FREE';
      }
      return session;
    },
  },
};

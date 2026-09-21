import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export interface AuthGuardResult {
  isAuthenticated: boolean;
  userId?: string;
  userEmail?: string;
  username?: string;
  error?: string;
}

/**
 * Validates current session and returns user identity for server API routes
 */
export async function requireAuth(): Promise<AuthGuardResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { isAuthenticated: false, error: 'Unauthorized: Authentication required' };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true, username: true },
  });

  if (!user) {
    return { isAuthenticated: false, error: 'Unauthorized: Account not found' };
  }

  return {
    isAuthenticated: true,
    userId: user.id,
    userEmail: user.email,
    username: user.username,
  };
}

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export interface AdminGuardResult {
  isAdmin: boolean;
  userId?: string;
  userEmail?: string;
  username?: string;
  error?: string;
}

/**
 * Validates whether current requester is an authenticated ADMIN user.
 */
export async function requireAdmin(): Promise<AdminGuardResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { isAdmin: false, error: 'Unauthorized: Admin authentication required' };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true, username: true, role: true, isSuspended: true },
  });

  if (!user || user.isSuspended) {
    return { isAdmin: false, error: 'Access denied: Account suspended or invalid' };
  }

  // Grant admin access if role === 'ADMIN' or if username === 'alex' / email === 'admin@avero.app' (bootstrap initial admin)
  const isUserAdmin = user.role === 'ADMIN' || user.username?.toLowerCase() === 'alex';

  if (!isUserAdmin) {
    return { isAdmin: false, error: 'Forbidden: Admin privilege required' };
  }

  return {
    isAdmin: true,
    userId: user.id,
    userEmail: user.email,
    username: user.username,
  };
}

/**
 * Enforces admin authorization on Server Components / Layouts (redirects non-admins to /login)
 */
export async function assertAdminPageAccess() {
  const guard = await requireAdmin();
  if (!guard.isAdmin) {
    redirect('/login?error=AdminAccessDenied');
  }
  return guard;
}

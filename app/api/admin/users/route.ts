import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/security/admin-guard';
import { prisma } from '@/lib/prisma';
import { DEMO_PROFILES } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error || 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.trim() || '';
    const status = searchParams.get('status')?.trim() || ''; // 'suspended' | 'verified' | 'premium' | 'admin'
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, parseInt(searchParams.get('limit') || '10', 10));
    const skip = (page - 1) * limit;

    const whereCondition: any = {};

    if (query) {
      whereCondition.OR = [
        { name: { contains: query } },
        { username: { contains: query } },
        { email: { contains: query } },
      ];
    }

    if (status === 'suspended') {
      whereCondition.isSuspended = true;
    } else if (status === 'verified') {
      whereCondition.isVerified = true;
    } else if (status === 'premium') {
      whereCondition.OR = [{ isPremium: true }, { subscriptionPlan: { in: ['PRO', 'VIP'] } }];
    } else if (status === 'admin') {
      whereCondition.role = 'ADMIN';
    }

    const [dbUsers, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          profileImage: true,
          role: true,
          isPublic: true,
          isSuspended: true,
          isVerified: true,
          isPremium: true,
          subscriptionPlan: true,
          profileViews: true,
          createdAt: true,
        },
      }),
      prisma.user.count({ where: whereCondition }),
    ]);

    let formattedUsers = dbUsers.map(u => ({
      id: u.id,
      name: u.name,
      username: u.username,
      email: u.email,
      avatarUrl: u.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: u.role || (u.username === 'alex' ? 'ADMIN' : 'USER'),
      isPublic: u.isPublic,
      isSuspended: u.isSuspended,
      isVerified: u.isVerified || u.username === 'alex',
      isPremium: u.isPremium || u.subscriptionPlan === 'PRO' || u.subscriptionPlan === 'VIP',
      subscriptionPlan: u.subscriptionPlan || 'FREE',
      profileViews: u.profileViews || 120,
      createdAt: u.createdAt.toISOString(),
    }));

    // Merge mock profiles if total database count is small
    if (formattedUsers.length < limit && page === 1 && !query) {
      const mockUsers = DEMO_PROFILES.map((dp, i) => ({
        id: `mock_usr_${dp.id}`,
        name: dp.name,
        username: dp.username,
        email: `${dp.username}@avero.app`,
        avatarUrl: dp.avatarUrl,
        role: dp.username === 'alex' ? 'ADMIN' : 'USER',
        isPublic: true,
        isSuspended: false,
        isVerified: true,
        isPremium: i % 2 === 0,
        subscriptionPlan: i % 2 === 0 ? 'PRO' : 'FREE',
        profileViews: 340 + i * 120,
        createdAt: new Date().toISOString(),
      }));

      const existingUsernames = new Set(formattedUsers.map(u => u.username.toLowerCase()));
      for (const mu of mockUsers) {
        if (!existingUsernames.has(mu.username.toLowerCase())) {
          formattedUsers.push(mu);
        }
      }
    }

    return NextResponse.json({
      users: formattedUsers,
      pagination: {
        page,
        limit,
        totalCount: totalCount || formattedUsers.length,
        totalPages: Math.ceil((totalCount || formattedUsers.length) / limit),
      },
    });
  } catch (error) {
    console.error('Admin Fetch Users Error:', error);
    return NextResponse.json({ error: 'Failed to fetch user list' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/security/admin-guard';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error || 'Forbidden' }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        role: true,
        isSuspended: true,
        isVerified: true,
        isPremium: true,
        subscriptionPlan: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Admin Get User Error:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

const updateUserSchema = z.object({
  isSuspended: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  isPremium: z.boolean().optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
  subscriptionPlan: z.enum(['FREE', 'PRO', 'VIP']).optional(),
});

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error || 'Forbidden' }, { status: 403 });
    }

    const userId = params.id;
    const body = await req.json();
    const validation = updateUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid user update payload' }, { status: 400 });
    }

    const updateData: any = { ...validation.data };
    if (updateData.subscriptionPlan === 'PRO' || updateData.subscriptionPlan === 'VIP') {
      updateData.isPremium = true;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        role: true,
        isSuspended: true,
        isVerified: true,
        isPremium: true,
        subscriptionPlan: true,
      },
    });

    return NextResponse.json({
      message: `User @${updatedUser.username} updated successfully!`,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Admin Update User Error:', error);
    return NextResponse.json({ error: 'Failed to update user status' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error || 'Forbidden' }, { status: 403 });
    }

    const userId = params.id;

    if (userId === adminCheck.userId) {
      return NextResponse.json({ error: 'You cannot delete your own admin account' }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: 'User account deleted permanently.' });
  } catch (error) {
    console.error('Admin Delete User Error:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

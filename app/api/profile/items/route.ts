import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    const { modelType, data } = body;

    let createdItem: any = null;

    if (modelType === 'hobby') {
      createdItem = await prisma.hobbyItem.create({
        data: {
          userId: user.id,
          name: data.name,
          icon: data.icon || '🎨',
          category: data.category || 'General',
          orderIndex: data.orderIndex || 0,
        },
      });
    } else if (modelType === 'favorite') {
      createdItem = await prisma.favoriteMediaItem.create({
        data: {
          userId: user.id,
          category: data.category, // 'food' | 'music' | 'movie' | 'tvshow' | 'book' | 'game' | 'sport' | 'travel'
          title: data.title,
          subtitle: data.subtitle || '',
          imageUrl: data.imageUrl || '',
          description: data.description || '',
          orderIndex: data.orderIndex || 0,
        },
      });
    } else if (modelType === 'preference') {
      createdItem = await prisma.preferenceItem.create({
        data: {
          userId: user.id,
          type: data.type, // 'like' | 'dislike' | 'enjoy' | 'avoid'
          label: data.label,
          orderIndex: data.orderIndex || 0,
        },
      });
    } else if (modelType === 'quote') {
      createdItem = await prisma.quoteItem.create({
        data: {
          userId: user.id,
          content: data.content,
          author: data.author || '',
          isFeatured: data.isFeatured || false,
          orderIndex: data.orderIndex || 0,
        },
      });
    } else if (modelType === 'social') {
      const existingSocials = await prisma.socialLinkItem.findMany({ where: { userId: user.id } });
      createdItem = await prisma.socialLinkItem.create({
        data: {
          userId: user.id,
          platform: data.platform,
          url: data.url,
          label: data.label || '',
        },
      });
    } else {
      return NextResponse.json({ error: 'Invalid item model type' }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Item created successfully!',
      item: createdItem,
    }, { status: 201 });
  } catch (error) {
    console.error('Create Profile Item Error:', error);
    return NextResponse.json(
      { error: 'Failed to create item.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const modelType = searchParams.get('modelType');

    if (!id || !modelType) {
      return NextResponse.json({ error: 'Missing item ID or modelType' }, { status: 400 });
    }

    if (modelType === 'hobby') {
      await prisma.hobbyItem.delete({ where: { id } });
    } else if (modelType === 'favorite') {
      await prisma.favoriteMediaItem.delete({ where: { id } });
    } else if (modelType === 'preference') {
      await prisma.preferenceItem.delete({ where: { id } });
    } else if (modelType === 'quote') {
      await prisma.quoteItem.delete({ where: { id } });
    } else if (modelType === 'social') {
      await prisma.socialLinkItem.delete({ where: { id } });
    } else {
      return NextResponse.json({ error: 'Invalid modelType' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Item deleted successfully!' });
  } catch (error) {
    console.error('Delete Item Error:', error);
    return NextResponse.json({ error: 'Failed to delete item.' }, { status: 500 });
  }
}

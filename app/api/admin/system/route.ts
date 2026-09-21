import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/security/admin-guard';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error || 'Forbidden' }, { status: 403 });
    }

    const settings = await (prisma as any).systemSetting.findMany();
    const settingsMap: Record<string, string> = {};

    settings.forEach((s: any) => {
      settingsMap[s.key] = s.value;
    });

    return NextResponse.json({
      featureFlags: {
        aiAssistantEnabled: settingsMap['feature_ai_assistant'] !== 'false',
        customWallpapersEnabled: settingsMap['feature_custom_wallpapers'] !== 'false',
        discoverySystemEnabled: settingsMap['feature_discovery'] !== 'false',
        signupAllowed: settingsMap['feature_signup_allowed'] !== 'false',
      },
      aiMetrics: {
        totalPromptsProcessed: 1480,
        averageResponseTimeMs: 420,
        activeModels: ['Gemini 1.5 Pro', 'Claude 3.5 Sonnet'],
      },
    });
  } catch (error) {
    console.error('Fetch System Settings Error:', error);
    return NextResponse.json({ error: 'Failed to fetch system settings' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error || 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const { key, value } = body;

    if (!key || typeof value === 'undefined') {
      return NextResponse.json({ error: 'Key and value required' }, { status: 400 });
    }

    await (prisma as any).systemSetting.upsert({
      where: { key },
      create: { key, value: String(value) },
      update: { value: String(value) },
    });

    return NextResponse.json({ message: `System setting '${key}' updated successfully.` });
  } catch (error) {
    console.error('Update System Setting Error:', error);
    return NextResponse.json({ error: 'Failed to update system setting' }, { status: 500 });
  }
}

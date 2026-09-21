import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/security/auth-guard';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB Limit
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const auth = await requireAuth();
    if (!auth.isAuthenticated || !auth.userId) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse FormData
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image file uploaded.' }, { status: 400 });
    }

    // 3. File Size Validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum 5MB limit.' },
        { status: 400 }
      );
    }

    // 4. MIME Type & Extension Validation
    if (!ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WEBP, and GIF images are allowed.' },
        { status: 400 }
      );
    }

    const rawExt = path.extname(file.name).toLowerCase();
    const ext = ALLOWED_EXTENSIONS.has(rawExt) ? rawExt : '.png';

    // 5. Secure File Naming & Storage Path
    const randomName = crypto.randomBytes(16).toString('hex');
    const filename = `img_${auth.userId}_${Date.now()}_${randomName}${ext}`;

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, filename);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json(
      {
        message: 'Image uploaded successfully!',
        url: publicUrl,
        filename,
        size: file.size,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('File Upload Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during image upload.' },
      { status: 500 }
    );
  }
}

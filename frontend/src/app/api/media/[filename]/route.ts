import { unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

export async function DELETE(
    request: NextRequest,
    { params }: { params: { filename: string } }
) {
  const filename = params.filename;

  if (!filename) {
    return NextResponse.json({ success: false, error: 'No filename provided' }, { status: 400 });
  }

  const relativeUploadDir = '/uploads';
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir);
  const filePath = join(uploadDir, filename);

  try {
    await unlink(filePath);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);

    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return NextResponse.json({ success: false, error: 'File not found' }, { status: 404 });
    }

    return NextResponse.json({ success: false, error: 'Failed to delete file' }, { status: 500 });
  }
} 
import { readdir, writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const relativeUploadDir = '/uploads';
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

  try {
    const files = await readdir(uploadDir);
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map(file => ({
        id: file,
        url: join(relativeUploadDir, file).replace(/\\/g, '/'),
        alt: file,
      }));

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error('Error reading media directory:', error);
    // If the directory doesn't exist, return an empty array, which is not an error for the client.
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return NextResponse.json({ success: true, images: [] });
    }
    return NextResponse.json({ success: false, error: 'Failed to read media directory' });
  }
}

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
  
    if (!file) {
      return NextResponse.json({ success: false, error: 'No file found' });
    }
  
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
  
    const relativeUploadDir = '/uploads';
    const uploadDir = join(process.cwd(), 'public', relativeUploadDir);
  
    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${file.name.replace(
        /\\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${file.type.split('/')[1]}`;
      
      await writeFile(join(uploadDir, filename), buffer);
  
      const fileUrl = join(relativeUploadDir, filename).replace(/\\/g, "/");
  
      return NextResponse.json({ success: true, url: fileUrl, filename: filename });
    } catch (error) {
      console.error('Error saving file:', error);
      return NextResponse.json({ success: false, error: 'Failed to save file' });
    }
  } 
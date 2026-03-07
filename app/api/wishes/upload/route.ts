import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'wishes';

    if (!file) {
      return NextResponse.json(
        { error: 'Missing file' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    
    const isValidType = allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension);
    
    if (!isValidType) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine file extension for saving
    const extFromName = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    const extension = extFromName === '.png' ? 'png' : 
                      extFromName === '.webp' ? 'webp' :
                      extFromName === '.gif' ? 'gif' : 'jpeg';
    
    // Create unique filename with timestamp
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const filename = `${folder}_${timestamp}_${randomString}.${extension}`;
    
    // Ensure directory exists
    const publicDir = join(process.cwd(), 'public', 'images', folder);
    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true });
    }
    
    const filepath = join(publicDir, filename);
    
    await writeFile(filepath, buffer);

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      url: `/images/${folder}/${filename}`,
      filename,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

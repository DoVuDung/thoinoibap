import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const index = formData.get('index') as string;
    const title = formData.get('title') as string;

    if (!file || !index) {
      return NextResponse.json(
        { error: 'Missing file or index' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/dng', 'image/x-adobe-dng'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.dng'];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    
    const isValidType = allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension);
    
    if (!isValidType) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, WebP, and DNG (RAW) are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (50MB max for RAW files)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 50MB.' },
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
                      extFromName === '.dng' ? 'dng' : 'jpeg';
    
    // Create filename
    const filename = `${index}.${extension}`;
    
    // Save to public/images directory
    const publicDir = join(process.cwd(), 'public', 'images');
    const filepath = join(publicDir, filename);
    
    await writeFile(filepath, buffer);

    // Also save metadata to a JSON file for reference
    const metadataPath = join(publicDir, 'gallery-metadata.json');
    let metadata: Record<string, { title: string; uploadedAt: string }> = {};
    
    try {
      const { readFile } = await import('fs/promises');
      const existing = await readFile(metadataPath, 'utf-8');
      metadata = JSON.parse(existing);
    } catch {
      // File doesn't exist yet, start fresh
    }

    metadata[index] = {
      title: title || `Image ${index}`,
      uploadedAt: new Date().toISOString(),
    };

    await writeFile(metadataPath, JSON.stringify(metadata, null, 2));

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      path: `/images/${filename}`,
      filename,
      index,
      title,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

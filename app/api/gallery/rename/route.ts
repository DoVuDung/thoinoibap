import { NextResponse } from 'next/server';
import { rename, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: Request) {
  try {
    const { oldIndex, newIndex } = await req.json();

    if (!oldIndex || !newIndex || oldIndex === newIndex) {
      return NextResponse.json(
        { error: 'Invalid indices provided' },
        { status: 400 }
      );
    }

    const imagesDir = join(process.cwd(), 'public', 'images');
    
    // Find the file with oldIndex
    const oldFilename = `${oldIndex}.jpeg`;
    const newFilename = `${newIndex}.jpeg`;
    
    const oldPath = join(imagesDir, oldFilename);
    const newPath = join(imagesDir, newFilename);

    // Rename the file
    await rename(oldPath, newPath);

    // Update metadata
    const metadataPath = join(imagesDir, 'gallery-metadata.json');
    try {
      const metadataContent = await readFile(metadataPath, 'utf-8');
      const metadata = JSON.parse(metadataContent);
      
      if (metadata[oldIndex]) {
        metadata[newIndex] = metadata[oldIndex];
        delete metadata[oldIndex];
        await writeFile(metadataPath, JSON.stringify(metadata, null, 2));
      }
    } catch {
      // Metadata file might not exist
    }

    return NextResponse.json({
      success: true,
      message: `Renamed ${oldFilename} to ${newFilename}`,
    });
  } catch (error) {
    console.error('Rename error:', error);
    return NextResponse.json(
      { error: 'Failed to rename file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

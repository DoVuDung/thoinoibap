import { NextResponse } from 'next/server';
import { unlink, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: Request) {
  try {
    const { index } = await req.json();

    if (!index) {
      return NextResponse.json(
        { error: 'Index is required' },
        { status: 400 }
      );
    }

    const imagesDir = join(process.cwd(), 'public', 'images');
    const filename = `${index}.jpeg`;
    const filePath = join(imagesDir, filename);

    // Delete the file
    try {
      await unlink(filePath);
    } catch (error) {
      // File might not exist
      console.log('File not found or already deleted:', filePath);
    }

    // Update metadata - remove entry
    const metadataPath = join(imagesDir, 'gallery-metadata.json');
    try {
      const metadataContent = await readFile(metadataPath, 'utf-8');
      const metadata = JSON.parse(metadataContent);
      
      if (metadata[index]) {
        delete metadata[index];
        await writeFile(metadataPath, JSON.stringify(metadata, null, 2));
      }
    } catch {
      // Metadata file might not exist
    }

    return NextResponse.json({
      success: true,
      message: `Deleted ${filename}`,
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

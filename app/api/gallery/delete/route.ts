import { NextResponse } from 'next/server';
import { unlink, readFile, writeFile, access, readdir } from 'fs/promises';
import { join } from 'path';

export async function POST(req: Request) {
  try {
    const { index } = await req.json();
    console.log('Delete request received for index:', index);

    if (!index) {
      return NextResponse.json(
        { error: 'Index is required' },
        { status: 400 }
      );
    }

    const imagesDir = join(process.cwd(), 'public', 'images');
    
    // Find file with any extension matching the index
    const files = await readdir(imagesDir);
    const fileToDelete = files.find(f => {
      const nameWithoutExt = f.replace(/\.[^/.]+$/, '');
      return nameWithoutExt === index;
    });

    if (!fileToDelete) {
      console.log('File not found for index:', index);
      return NextResponse.json(
        { error: `File with index ${index} not found`, details: 'File may have already been deleted' },
        { status: 404 }
      );
    }

    const filePath = join(imagesDir, fileToDelete);
    console.log('Found file to delete:', filePath);

    // Delete the file
    try {
      await unlink(filePath);
      console.log('File deleted successfully:', filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
      return NextResponse.json(
        { error: 'Failed to delete file', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }

    // Update metadata - remove entry
    const metadataPath = join(imagesDir, 'gallery-metadata.json');
    try {
      const metadataContent = await readFile(metadataPath, 'utf-8');
      const metadata = JSON.parse(metadataContent);
      
      if (metadata[index]) {
        delete metadata[index];
        await writeFile(metadataPath, JSON.stringify(metadata, null, 2));
        console.log('Metadata updated');
      }
    } catch (err) {
      console.log('Metadata update error (non-critical):', err);
    }

    return NextResponse.json({
      success: true,
      message: `Deleted ${fileToDelete}`,
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

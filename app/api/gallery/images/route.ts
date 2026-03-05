import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const imagesDir = join(process.cwd(), 'public', 'images');
    
    // Read all files in the images directory
    const files = await readdir(imagesDir);
    
    // Filter only image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.dng'];
    const imageFiles = files
      .filter(file => {
        const ext = file.toLowerCase().slice(file.lastIndexOf('.'));
        return imageExtensions.includes(ext);
      })
      .sort((a, b) => {
        // Extract numbers from filenames for sorting (e.g., "1.jpeg", "2.jpeg")
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      });

    // Try to load metadata
    let metadata: Record<string, { title: string }> = {};
    try {
      const { readFile } = await import('fs/promises');
      const metadataPath = join(imagesDir, 'gallery-metadata.json');
      const metadataContent = await readFile(metadataPath, 'utf-8');
      metadata = JSON.parse(metadataContent);
    } catch {
      // Metadata file doesn't exist, use default titles
    }

    // Create image objects
    const images = imageFiles.map((file, index) => {
      const id = file.replace(/\.[^/.]+$/, ''); // Remove extension
      const metadataEntry = metadata[id];
      
      return {
        id: `p-${id}`,
        src: `/images/${file}`,
        alt: metadataEntry?.title || `Ảnh ${id}`,
      };
    });

    return NextResponse.json({
      success: true,
      total: images.length,
      images,
    });
  } catch (error) {
    console.error('Error reading gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to load gallery images', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

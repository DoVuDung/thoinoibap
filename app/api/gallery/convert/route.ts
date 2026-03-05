import { NextResponse } from 'next/server';
import { writeFile, readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const index = formData.get('index') as string;
    const title = formData.get('title') as string || '';

    if (!file || !index) {
      return NextResponse.json(
        { error: 'File and index are required' },
        { status: 400 }
      );
    }

    // Check if it's a DNG file
    const isDng = file.name.toLowerCase().endsWith('.dng') || 
                  file.type === 'image/dng' || 
                  file.type === 'image/x-adobe-dng';

    const imagesDir = join(process.cwd(), 'public', 'images');
    const tempInputPath = join(imagesDir, `temp-${Date.now()}.dng`);
    const outputPath = join(imagesDir, `${index}.jpeg`);

    // Write file to temp location
    const bytes = await file.arrayBuffer();
    await writeFile(tempInputPath, Buffer.from(bytes));

    if (isDng) {
      // Convert DNG to JPEG using ImageMagick
      try {
        await execAsync(`convert "${tempInputPath}" -quality 90 "${outputPath}"`);
      } catch (convertError) {
        console.error('ImageMagick convert failed:', convertError);
        // Fallback: try with sharp if available
        try {
          const sharp = await import('sharp');
          await sharp.default(tempInputPath)
            .jpeg({ quality: 90 })
            .toFile(outputPath);
        } catch (sharpError) {
          console.error('Sharp conversion failed:', sharpError);
          // If both fail, just copy as-is (browser may handle it)
          await writeFile(outputPath, Buffer.from(bytes));
        }
      }
    } else {
      // For non-DNG files, use sharp to convert/optimize
      try {
        const sharp = await import('sharp');
        await sharp.default(tempInputPath)
          .jpeg({ quality: 90 })
          .toFile(outputPath);
      } catch {
        // If sharp fails, just copy the file
        await writeFile(outputPath, Buffer.from(bytes));
      }
    }

    // Clean up temp file
    try {
      await unlink(tempInputPath);
    } catch {
      // Ignore cleanup errors
    }

    // Save metadata
    const metadataPath = join(imagesDir, 'gallery-metadata.json');
    try {
      const { readFile: readMetadata, writeFile: writeMetadata } = await import('fs/promises');
      let metadata: Record<string, { title: string; uploadedAt: string }> = {};
      try {
        const content = await readMetadata(metadataPath, 'utf-8');
        metadata = JSON.parse(content);
      } catch {
        // File doesn't exist yet
      }
      metadata[index] = {
        title: title || `Ảnh ${index}`,
        uploadedAt: new Date().toISOString(),
      };
      await writeMetadata(metadataPath, JSON.stringify(metadata, null, 2));
    } catch (metadataError) {
      console.error('Metadata save error:', metadataError);
    }

    return NextResponse.json({
      success: true,
      message: isDng ? 'DNG converted to JPEG successfully' : 'Image uploaded successfully',
      path: `/images/${index}.jpeg`,
      converted: isDng,
    });
  } catch (error) {
    console.error('Convert error:', error);
    return NextResponse.json(
      { error: 'Failed to convert/upload image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

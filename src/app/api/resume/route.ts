import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'Thai_Nguyen_Resume_2026_v1.pdf');
    const file = await readFile(filePath);

    // NextResponse expects a BodyInit; Buffer is fine at runtime, so cast for TypeScript.
    return new NextResponse(file as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Thai_Nguyen_Resume_2026_v1.pdf"',
      },
    });
  } catch (error) {
    console.error('Error serving resume PDF:', error);
    return NextResponse.json({ error: 'Resume not available' }, { status: 500 });
  }
}

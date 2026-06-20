import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/storage'

const ALLOWED_TYPES = ['image/jpeg','image/png','image/webp','image/avif']
const MAX_SIZE = 10 * 1024 * 1024

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const file = form.get('file') as File | null
  const section = form.get('section') as string | null
  const altText = form.get('alt_text') as string | null
  if (!file || !section) return NextResponse.json({ error: 'file and section are required' }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: 'Unsupported file type' }, { status: 415 })
  if (file.size > MAX_SIZE) return NextResponse.json({ error: 'File exceeds 10MB limit' }, { status: 413 })
  try {
    const result = await uploadImage(file, section, altText ?? undefined)
    return NextResponse.json(result, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

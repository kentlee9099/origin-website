import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

const VALID_TAGS = ['site-config','nav','ticker','hero','about','services','cases','insights','testimonials','cta'] as const

export async function POST(req: NextRequest) {
  const { tag, secret } = await req.json() as { tag: string; secret: string }
  if (secret !== process.env.REVALIDATE_SECRET) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!VALID_TAGS.includes(tag as typeof VALID_TAGS[number])) return NextResponse.json({ error: `Invalid tag: ${tag}` }, { status: 400 })
  revalidateTag(tag)
  return NextResponse.json({ revalidated: true, tag, at: new Date().toISOString() })
}

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const db = createAdminClient()
const heroSchema = z.object({
  headline: z.string().min(1), headline_highlight: z.string().min(1), subtitle: z.string().min(1),
  cta_primary_label: z.string().min(1), cta_primary_href: z.string().min(1),
  cta_secondary_label: z.string().nullable().optional(), cta_secondary_href: z.string().nullable().optional(),
  stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
})

export async function GET() {
  const { data, error } = await db.from('hero_content').select('*').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
export async function PUT(req: NextRequest) {
  const parsed = heroSchema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const { data: existing } = await db.from('hero_content').select('id').single()
  const { data, error } = existing
    ? await db.from('hero_content').update(parsed.data).eq('id', existing.id).select().single()
    : await db.from('hero_content').insert(parsed.data).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  revalidateTag('hero')
  return NextResponse.json(data)
}

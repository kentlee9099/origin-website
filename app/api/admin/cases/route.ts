import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const db = createAdminClient()
const caseSchema = z.object({
  title: z.string().min(1), category: z.string().min(1), description: z.string().min(1),
  image_url: z.string().nullable().optional(), media_type: z.enum(['image','video']).default('image'),
  video_url: z.string().nullable().optional(), sort_order: z.number().int().default(0), is_visible: z.boolean().default(true),
})

export async function GET() {
  const { data, error } = await db.from('cases').select('*').order('sort_order')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
export async function POST(req: NextRequest) {
  const parsed = caseSchema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const { data, error } = await db.from('cases').insert(parsed.data).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  revalidateTag('cases')
  return NextResponse.json(data, { status: 201 })
}
export async function PUT(req: NextRequest) {
  const { id, ...body } = await req.json()
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const parsed = caseSchema.partial().safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const { data, error } = await db.from('cases').update(parsed.data).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  revalidateTag('cases')
  return NextResponse.json(data)
}
export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const { error } = await db.from('cases').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  revalidateTag('cases')
  return NextResponse.json({ success: true })
}

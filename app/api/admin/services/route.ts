import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const db = createAdminClient()
const serviceSchema = z.object({
  icon: z.string().min(1), category_en: z.string().min(1), title: z.string().min(1),
  description: z.string().min(1), features: z.array(z.string()).default([]),
  cta_label: z.string().default('了解详情'), cta_href: z.string().min(1),
  sort_order: z.number().int().default(0), is_visible: z.boolean().default(true),
})

export async function GET() {
  const { data, error } = await createAdminClient().from('services').select('*').order('sort_order')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
export async function POST(req: NextRequest) {
  const parsed = serviceSchema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const { data, error } = await createAdminClient().from('services').insert(parsed.data).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  revalidateTag('services'); return NextResponse.json(data, { status: 201 })
}
export async function PUT(req: NextRequest) {
  const { id, ...body } = await req.json()
  const parsed = serviceSchema.partial().safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const { data, error } = await createAdminClient().from('services').update(parsed.data).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  revalidateTag('services'); return NextResponse.json(data)
}
export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  const { error } = await createAdminClient().from('services').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  revalidateTag('services'); return NextResponse.json({ success: true })
}

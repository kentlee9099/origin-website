import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { revalidateTag } from 'next/cache'

const db = createAdminClient()
const ALLOWED = ['nav_items','ticker_items','about_features','services','cases','testimonials'] as const
type AllowedTable = typeof ALLOWED[number]

export async function PATCH(req: NextRequest) {
  const { table, ids } = await req.json() as { table: string; ids: string[] }
  if (!ALLOWED.includes(table as AllowedTable)) return NextResponse.json({ error: 'Invalid table' }, { status: 400 })
  if (!Array.isArray(ids) || ids.length === 0) return NextResponse.json({ error: 'ids must be non-empty array' }, { status: 400 })
  await Promise.all(ids.map((id, index) => db.from(table as AllowedTable).update({ sort_order: index }).eq('id', id)))
  revalidateTag(table)
  return NextResponse.json({ success: true })
}

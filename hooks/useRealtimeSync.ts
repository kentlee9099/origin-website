'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const TABLES = ['hero_content','about_content','about_features','services','cases','insights','testimonials','cta_content','nav_items','ticker_items'] as const

export function useRealtimeSync() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase.channel('origin-cms-realtime')
    TABLES.forEach(table => {
      channel.on('postgres_changes' as any, { event: '*', schema: 'public', table }, () => router.refresh())
    })
    channel.subscribe()
    return () => { void supabase.removeChannel(channel) }
  }, [router, supabase])
}

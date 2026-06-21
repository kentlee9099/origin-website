import { unstable_cache } from 'next/cache'
import { createAdminClient } from './supabase-admin'

export const getSiteConfig = unstable_cache(
  async () => { const { data } = await createAdminClient().from('site_config').select('*').single(); return data },
  ['site-config'], { tags: ['site-config'], revalidate: 3600 }
)

export const getNavItems = unstable_cache(
  async () => {
    const { data } = await createAdminClient().from('nav_items').select('*').eq('is_visible', true).order('sort_order')
    return data ?? []
  },
  ['nav'], { tags: ['nav'], revalidate: 3600 }
)

export const getTickerItems = unstable_cache(
  async () => {
    const { data } = await createAdminClient().from('ticker_items').select('*').eq('is_visible', true).order('sort_order')
    return data ?? []
  },
  ['ticker'], { tags: ['ticker'], revalidate: 3600 }
)

export const getHeroContent = unstable_cache(
  async () => { const { data } = await createAdminClient().from('hero_content').select('*').single(); return data },
  ['hero'], { tags: ['hero'], revalidate: 60 }
)

export const getAboutContent = unstable_cache(
  async () => {
    const [{ data: content }, { data: features }] = await Promise.all([
      createAdminClient().from('about_content').select('*').single(),
      createAdminClient().from('about_features').select('*').eq('is_visible', true).order('sort_order'),
    ])
    return { content: content ?? null, features: features ?? [] }
  },
  ['about'], { tags: ['about'], revalidate: 60 }
)

export const getServices = unstable_cache(
  async () => {
    const { data } = await createAdminClient().from('services').select('*').eq('is_visible', true).order('sort_order')
    return data ?? []
  },
  ['services'], { tags: ['services'], revalidate: 60 }
)

export const getCases = unstable_cache(
  async () => {
    const { data } = await createAdminClient().from('cases').select('*').eq('is_visible', true).order('sort_order')
    return data ?? []
  },
  ['cases'], { tags: ['cases'], revalidate: 60 }
)

export const getInsights = unstable_cache(
  async () => {
    const { data } = await createAdminClient().from('insights').select('*').eq('is_visible', true).order('published_at', { ascending: false })
    return data ?? []
  },
  ['insights'], { tags: ['insights'], revalidate: 60 }
)

export const getTestimonials = unstable_cache(
  async () => {
    const { data } = await createAdminClient().from('testimonials').select('*').eq('is_visible', true).order('sort_order')
    return data ?? []
  },
  ['testimonials'], { tags: ['testimonials'], revalidate: 60 }
)

export const getCtaContent = unstable_cache(
  async () => { const { data } = await createAdminClient().from('cta_content').select('*').single(); return data },
  ['cta'], { tags: ['cta'], revalidate: 60 }
)

// Admin queries (no cache)
export async function getAdminCases() {
  const { data } = await createAdminClient().from('cases').select('*').order('sort_order'); return data ?? []
}
export async function getAdminServices() {
  const { data } = await createAdminClient().from('services').select('*').order('sort_order'); return data ?? []
}
export async function getAdminInsights() {
  const { data } = await createAdminClient().from('insights').select('*').order('published_at', { ascending: false }); return data ?? []
}
export async function getAdminTestimonials() {
  const { data } = await createAdminClient().from('testimonials').select('*').order('sort_order'); return data ?? []
}
export async function getAdminMedia() {
  const { data } = await createAdminClient().from('media_assets').select('*').order('created_at', { ascending: false }); return data ?? []
}
export async function getAdminNavItems() {
  const { data } = await createAdminClient().from('nav_items').select('*').order('sort_order'); return data ?? []
}
export async function getAdminTickerItems() {
  const { data } = await createAdminClient().from('ticker_items').select('*').order('sort_order'); return data ?? []
}

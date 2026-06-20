'use client'
import { useEffect, useRef } from 'react'
import type { Database } from '@/types/database'

type HeroRow = Database['public']['Tables']['hero_content']['Row']
interface Props { data: HeroRow }

export function Hero({ data }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!els) return
    els.forEach((el, i) => setTimeout(() => el.classList.add('revealed'), i * 110))
  }, [])

  const stats = Array.isArray(data.stats) ? (data.stats as Array<{ value: string; label: string }>) : []
  const [before, after] = data.headline.split(data.headline_highlight)

  return (
    <section id="hero" ref={ref} className="relative min-h-[100dvh] flex flex-col justify-center px-[clamp(24px,5vw,72px)] pt-24 pb-16">
      <p data-reveal className="text-label tracking-[0.18em] uppercase text-by-28 mb-6 opacity-0">起源 · Origin EVA · Est. 2014</p>
      <h1 data-reveal className="text-display font-thin text-by-text max-w-[900px] mb-8 opacity-0" style={{ lineHeight: '0.97' }}>
        {before}<span className="text-by-blue-lt">{data.headline_highlight}</span>{after}
      </h1>
      <p data-reveal className="text-base font-light text-by-55 leading-relaxed max-w-[520px] mb-10 opacity-0 whitespace-pre-line">{data.subtitle}</p>
      <div data-reveal className="flex flex-wrap items-center gap-4 mb-16 opacity-0">
        <a href={data.cta_primary_href}
          className="inline-flex items-center gap-2 bg-by-blue hover:bg-by-blue-lt text-white text-[12px] tracking-[0.14em] uppercase font-semibold px-6 py-3 rounded-sm transition-colors duration-250">
          {data.cta_primary_label} →
        </a>
        {data.cta_secondary_label && data.cta_secondary_href && (
          <a href={data.cta_secondary_href}
            className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.14em] uppercase font-medium text-by-55 hover:text-by-text border-b border-by-55 hover:border-by-text pb-0.5 transition-all duration-250">
            {data.cta_secondary_label}
          </a>
        )}
      </div>
      {stats.length > 0 && (
        <div data-reveal className="flex flex-wrap gap-10 opacity-0">
          {stats.map(stat => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-h1 font-thin text-by-text">{stat.value}</span>
              <span className="text-label tracking-[0.18em] uppercase text-by-28">{stat.label}</span>
            </div>
          ))}
        </div>
      )}
      <div className="absolute bottom-8 left-[clamp(24px,5vw,72px)] flex items-center gap-3">
        <div className="w-6 h-px bg-by-28" />
        <span className="text-micro tracking-[0.14em] uppercase text-by-28">向下滚动</span>
      </div>
    </section>
  )
}

'use client'
import { useEffect, useRef } from 'react'
import type { Database } from '@/types/database'
import type { Json } from '@/types/database'

type CTARow = Database['public']['Tables']['cta_content']['Row']
interface TrustSignal { icon: string; label: string }
interface Props { data: CTARow }

export function CTASection({ data }: Props) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const trustSignals = Array.isArray(data.trust_signals) ? (data.trust_signals as TrustSignal[]) : []
  const [before, after] = data.headline.split(data.headline_highlight)

  return (
    <section id="cta" ref={ref} className="bg-by-bg-alt border-t border-by px-[clamp(24px,5vw,72px)] py-24">
      <div className="max-w-[720px] mx-auto flex flex-col items-center text-center gap-8 md:border-x border-by md:px-16">
        {data.badge && (
          <div data-reveal className="flex items-center gap-4 opacity-0">
            <span className="flex-1 h-px bg-by-border" />
            <span className="text-[10px] tracking-[0.18em] uppercase text-by-28">{data.badge}</span>
            <span className="flex-1 h-px bg-by-border" />
          </div>
        )}
        <h2 data-reveal className="text-display font-thin text-by-text opacity-0" style={{ animationDelay: '80ms', lineHeight: '1.0' }}>
          {before}<span className="text-by-blue-lt">{data.headline_highlight}</span>{after}
          {data.headline_suffix && <span className="text-by-text">{data.headline_suffix}</span>}
        </h2>
        <p data-reveal className="text-base font-light text-by-55 leading-relaxed opacity-0" style={{ animationDelay: '160ms' }}>
          {data.body}
        </p>
        <div data-reveal className="flex flex-wrap items-center justify-center gap-4 opacity-0" style={{ animationDelay: '240ms' }}>
          <a href={data.cta_primary_href}
            className="bg-by-blue hover:bg-by-blue-lt text-white text-[12px] tracking-[0.14em] uppercase font-semibold px-8 py-3.5 rounded-sm transition-colors">
            {data.cta_primary_label}
          </a>
          {data.cta_secondary_label && data.cta_secondary_href && (
            <a href={data.cta_secondary_href}
              className="text-[12px] tracking-[0.14em] uppercase font-medium text-by-55 hover:text-by-text border border-by hover:border-by-borderh px-6 py-3.5 rounded-sm transition-all">
              {data.cta_secondary_label}
            </a>
          )}
        </div>
        {trustSignals.length > 0 && (
          <div data-reveal className="flex flex-wrap justify-center gap-6 pt-6 border-t border-by opacity-0" style={{ animationDelay: '320ms' }}>
            {trustSignals.map((ts, i) => (
              <span key={i} className="text-[11px] text-by-28 flex items-center gap-1.5">
                <span>{ts.icon}</span>{ts.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

'use client'
import { useEffect, useRef } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Database } from '@/types/database'

type AboutRow   = Database['public']['Tables']['about_content']['Row']
type FeatureRow = Database['public']['Tables']['about_features']['Row']
interface Props { content: AboutRow; features: FeatureRow[] }

export function AboutSection({ content, features }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const stats = Array.isArray(content.stats) ? (content.stats as Array<{ value: string; label: string }>) : []
  const [before, after] = content.headline.split(content.headline_highlight)

  return (
    <section id="about" ref={ref} className="relative bg-by-bg-alt border-t border-by px-[clamp(24px,5vw,72px)] py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div className="flex flex-col gap-8">
          <div data-reveal className="opacity-0"><SectionLabel num="02" label={content.badge} /></div>
          <h2 data-reveal className="text-h1 font-thin text-by-text leading-tight opacity-0" style={{ animationDelay: '80ms' }}>
            {before}<span className="text-by-blue-lt">{content.headline_highlight}</span>{after}
          </h2>
          <div data-reveal className="flex flex-col gap-4 opacity-0" style={{ animationDelay: '160ms' }}>
            {content.body_paragraphs.map((p, i) => (
              <p key={i} className="text-base font-light text-by-55 leading-relaxed">{p}</p>
            ))}
          </div>
          {stats.length > 0 && (
            <div data-reveal className="flex gap-8 pt-6 border-t border-by opacity-0" style={{ animationDelay: '240ms' }}>
              {stats.map(s => (
                <div key={s.label}>
                  <p className="text-h2 font-thin text-by-text">{s.value}</p>
                  <p className="text-label tracking-[0.18em] uppercase text-by-28 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="gap-grid grid grid-cols-2">
          {features.map((f, i) => (
            <div key={f.id} data-reveal className="flex flex-col gap-3 p-6 bg-by-bg opacity-0" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="text-xl">{f.icon}</span>
              <h3 className="text-[14px] font-medium text-by-text">{f.title}</h3>
              <p className="text-[12px] font-light text-by-55 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'
import { useEffect, useRef } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Database } from '@/types/database'

type ServiceRow = Database['public']['Tables']['services']['Row']
interface Props { items: ServiceRow[] }

export function ServicesSection({ items }: Props) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.05 }
    )
    ref.current?.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="services" ref={ref} className="border-t border-by px-[clamp(24px,5vw,72px)] py-24">
      <div data-reveal className="opacity-0 mb-12">
        <SectionLabel num="03" label="核心服务" />
        <h2 className="text-h1 font-thin text-by-text mt-4">我们能为您做什么</h2>
      </div>
      <div className="gap-grid grid grid-cols-1 md:grid-cols-2">
        {items.map((item, i) => (
          <div key={item.id} data-reveal className="flex flex-col gap-4 p-8 bg-by-bg opacity-0" style={{ animationDelay: `${i * 80}ms` }}>
            <span className="text-2xl">{item.icon}</span>
            <p className="text-[10px] tracking-[0.16em] uppercase text-by-28 font-semibold">{item.category_en}</p>
            <h3 className="text-[18px] font-light text-by-text">{item.title}</h3>
            <p className="text-[13px] font-light text-by-55 leading-relaxed">{item.description}</p>
            <ul className="flex flex-col gap-2 mt-2">
              {item.features.map((f, fi) => (
                <li key={fi} className="text-[12px] text-by-55 flex gap-2">
                  <span className="text-by-28 flex-shrink-0">—</span>{f}
                </li>
              ))}
            </ul>
            <a href={item.cta_href} className="text-[11px] tracking-[0.12em] uppercase text-by-blue-lt hover:text-by-text transition-colors mt-auto pt-4">
              {item.cta_label} →
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

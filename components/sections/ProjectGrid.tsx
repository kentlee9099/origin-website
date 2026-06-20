'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Database } from '@/types/database'

type CaseRow = Database['public']['Tables']['cases']['Row']
interface Props { items: CaseRow[] }

export function ProjectGrid({ items }: Props) {
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
    <section id="cases" ref={ref} className="bg-by-bg-alt border-t border-by px-[clamp(24px,5vw,72px)] py-24">
      <div data-reveal className="opacity-0 mb-12">
        <SectionLabel num="04" label="成功案例" />
        <h2 className="text-h1 font-thin text-by-text mt-4">代表性项目</h2>
      </div>
      <div className="gap-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <div key={item.id} data-reveal className="bg-by-bg overflow-hidden opacity-0 group" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="relative aspect-video bg-by-surface overflow-hidden">
              {item.image_url ? (
                <Image src={item.image_url} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-by-12 text-[10px] tracking-[0.1em] uppercase">{item.category}</div>
              )}
            </div>
            <div className="p-6">
              <p className="text-[10px] tracking-[0.16em] uppercase text-by-28 mb-2">{item.category}</p>
              <h3 className="text-[15px] font-light text-by-text leading-snug">{item.title}</h3>
              {item.description && <p className="text-[12px] text-by-55 mt-2 leading-relaxed">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

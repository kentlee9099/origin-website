'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Database } from '@/types/database'

type InsightRow = Database['public']['Tables']['insights']['Row']
interface Props { items: InsightRow[] }

export function EditorialSection({ items }: Props) {
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
    <section id="insights" ref={ref} className="border-t border-by px-[clamp(24px,5vw,72px)] py-24">
      <div data-reveal className="opacity-0 mb-12">
        <SectionLabel num="05" label="贸易洞察" />
        <h2 className="text-h1 font-thin text-by-text mt-4">市场情报与行业观察</h2>
      </div>
      <div className="gap-grid grid grid-cols-1 md:grid-cols-3">
        {items.map((item, i) => (
          <article key={item.id} data-reveal className="bg-by-bg overflow-hidden opacity-0 group" style={{ animationDelay: `${i * 80}ms` }}>
            {item.image_url && (
              <div className="relative aspect-video bg-by-surface overflow-hidden">
                <Image src={item.image_url} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw" />
              </div>
            )}
            <div className="p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[9.5px] tracking-[0.16em] uppercase text-by-28 font-semibold">{item.category}</span>
                <span className="w-1 h-1 rounded-full bg-by-28" />
                <span className="text-[9.5px] text-by-28">{item.type}</span>
              </div>
              <h3 className="text-[15px] font-light text-by-text leading-snug">{item.title}</h3>
              <p className="text-[12px] text-by-55 leading-relaxed">{item.description}</p>
              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-by">
                <span className="text-[11px] text-by-55">{item.author_name}</span>
                <span className="text-by-28">·</span>
                <span className="text-[11px] text-by-28">{new Date(item.published_at).toLocaleDateString('zh-CN')}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

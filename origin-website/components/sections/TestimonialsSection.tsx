'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Database } from '@/types/database'

type TestimonialRow = Database['public']['Tables']['testimonials']['Row']
interface Props { items: TestimonialRow[] }

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill={i < count ? '#5C85B8' : 'none'} stroke="#5C85B8" strokeWidth="0.8">
          <polygon points="5,0.5 6.1,3.5 9.5,3.5 6.8,5.6 7.9,8.7 5,6.8 2.1,8.7 3.2,5.6 0.5,3.5 3.9,3.5" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialsSection({ items }: Props) {
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
    <section id="testimonials" ref={ref} className="border-t border-by px-[clamp(24px,5vw,72px)] py-24">
      <div data-reveal className="opacity-0 mb-12">
        <SectionLabel num="06" label="客户评价" />
        <h2 className="text-h1 font-thin text-by-text mt-4">合作伙伴的声音</h2>
      </div>
      <div className="gap-grid grid grid-cols-1 md:grid-cols-3">
        {items.map((item, i) => (
          <div key={item.id} data-reveal className="bg-by-bg p-8 flex flex-col gap-5 opacity-0" style={{ animationDelay: `${i * 80}ms` }}>
            <StarRating count={item.rating} />
            <blockquote className="text-[13px] font-light text-by-55 leading-relaxed border-l-2 border-by-blue pl-4 italic">
              {item.quote}
            </blockquote>
            <div className="flex items-center gap-3 mt-auto">
              {item.author_avatar ? (
                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={item.author_avatar} alt={item.author_name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-by-surface flex items-center justify-center text-[11px] font-semibold text-by-55 flex-shrink-0">
                  {item.author_name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-[12px] font-medium text-by-text">{item.author_name}</p>
                <p className="text-[11px] text-by-28">{item.author_title} · {item.author_company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

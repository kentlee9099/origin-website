'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Database } from '@/types/database'

type NavItem = Database['public']['Tables']['nav_items']['Row']
interface Props { items: NavItem[] }

export function Nav({ items }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = items.filter(i => !i.is_cta)
  const ctaBtn = items.find(i => i.is_cta)

  return (
    <header className={['fixed top-0 inset-x-0 z-50 transition-all duration-300',
      scrolled ? 'bg-by-bg/95 backdrop-blur-sm border-b border-by' : 'bg-transparent'].join(' ')}>
      <nav className="flex items-center justify-between px-[clamp(24px,5vw,72px)] h-16">
        <Link href="/" className="text-[13px] font-semibold tracking-[0.20em] uppercase text-by-text">ORIGIN</Link>
        <ul className="hidden md:flex items-center gap-8">
          {links.map(item => (
            <li key={item.id}>
              <Link href={item.href}
                className="text-[11px] tracking-[0.12em] uppercase font-medium text-by-55 hover:text-by-text transition-colors duration-200">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-4">
          {ctaBtn && (
            <Link href={ctaBtn.href}
              className="text-[11px] tracking-[0.12em] uppercase font-semibold text-by-text border border-by-55 hover:border-by-text px-4 py-2 rounded-sm transition-all duration-200">
              {ctaBtn.label}
            </Link>
          )}
        </div>
        <button className="md:hidden text-by-55 hover:text-by-text" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-by-bg border-t border-by px-6 py-4 flex flex-col gap-4">
          {links.map(item => (
            <Link key={item.id} href={item.href} onClick={() => setMenuOpen(false)}
              className="text-[12px] tracking-[0.12em] uppercase text-by-55 hover:text-by-text transition-colors">
              {item.label}
            </Link>
          ))}
          {ctaBtn && (
            <Link href={ctaBtn.href} onClick={() => setMenuOpen(false)}
              className="text-[12px] tracking-[0.12em] uppercase font-semibold text-by-text border border-by-55 px-4 py-2 rounded-sm text-center">
              {ctaBtn.label}
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

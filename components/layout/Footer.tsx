import Link from 'next/link'

const LINKS = [{ label: '隐私政策', href: '/privacy' }, { label: '使用条款', href: '/terms' }, { label: '联系我们', href: '/contact' }]

export function Footer() {
  return (
    <footer className="border-t border-by px-[clamp(24px,5vw,72px)] py-12 pb-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-[13px] font-semibold tracking-[0.18em] text-by-text mb-1">ORIGIN</p>
          <p className="text-[11px] text-by-28">© {new Date().getFullYear()} Origin EVA · 起源国际贸易有限公司</p>
        </div>
        <ul className="flex gap-6">
          {LINKS.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="text-[11px] tracking-[0.06em] text-by-28 hover:text-by-55 transition-colors">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

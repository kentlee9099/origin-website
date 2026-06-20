'use client'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

const NAV = [
  { href: '/admin',          label: '仪表盘' },
  { href: '/admin/cases',    label: '案例'   },
  { href: '/admin/services', label: '服务'   },
  { href: '/admin/insights', label: '洞察'   },
  { href: '/admin/media',    label: '媒体库' },
]

export function AdminNav({ userEmail }: { userEmail?: string }) {
  const router   = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <span className="text-sm font-bold text-white tracking-[0.15em]">ORIGIN CMS</span>
          <nav className="hidden md:flex gap-1">
            {NAV.map(n => (
              <Link key={n.href} href={n.href}
                className={['text-xs px-3 py-1.5 rounded-md transition-colors',
                  pathname === n.href ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-gray-800'].join(' ')}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-blue-400 transition-colors">↗ 前台</a>
          <span className="text-xs text-gray-600 hidden sm:block">{userEmail}</span>
          <button onClick={logout} className="text-xs text-gray-500 hover:text-red-400 transition-colors">退出</button>
        </div>
      </div>
    </header>
  )
}

'use client'
import Link from 'next/link'

const SECTIONS = [
  { href: '/admin/hero',         label: 'Hero 首屏',    desc: '主标题、副标题、CTA 按钮',     icon: '⬛' },
  { href: '/admin/about',        label: '关于我们',      desc: '公司简介、数据统计、特色卡片', icon: '🏢' },
  { href: '/admin/services',     label: '服务',          desc: '服务项目列表、图标、功能清单', icon: '⚙️' },
  { href: '/admin/cases',        label: '成功案例',      desc: '案例图片、分类、描述',         icon: '📁' },
  { href: '/admin/insights',     label: '贸易洞察',      desc: '文章/视频、作者、发布日期',    icon: '📰' },
  { href: '/admin/testimonials', label: '客户评价',      desc: '引言、星级、客户信息',         icon: '💬' },
  { href: '/admin/cta',          label: 'CTA 区',        desc: '召唤行动标题、信任背书',       icon: '🔘' },
  { href: '/admin/nav',          label: '导航',          desc: '菜单链接、排序、CTA 按钮',     icon: '🧭' },
  { href: '/admin/ticker',       label: '走马灯',        desc: '底部滚动文字管理',             icon: '📢' },
  { href: '/admin/media',        label: '媒体库',        desc: '所有上传图片资源管理',         icon: '🖼️' },
]

export default function AdminDashboard() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-light text-white tracking-tight">内容管理仪表盘</h1>
        <p className="text-sm text-gray-500 mt-1">选择模块开始编辑内容</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {SECTIONS.map((s) => (
          <Link key={s.href} href={s.href}
            className="flex items-start gap-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl p-5 transition-all">
            <span className="text-2xl mt-0.5 flex-shrink-0">{s.icon}</span>
            <div>
              <p className="text-sm font-medium text-gray-200 mb-0.5">{s.label}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

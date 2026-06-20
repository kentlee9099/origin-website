import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: '起源 ORIGIN | 中亚与俄罗斯大宗贸易专家', template: '%s | ORIGIN' },
  description: '专注大宗商品采购与中国产品出口服务，您在中亚及俄罗斯地区值得信赖的贸易伙伴',
  openGraph: { images: ['/og-image.jpg'], locale: 'zh_CN', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="bg-by-bg font-sans antialiased">{children}</body>
    </html>
  )
}

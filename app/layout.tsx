import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ORIGIN',
  description: '连接中国与中亚的贸易桥梁',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
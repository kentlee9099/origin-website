export const metadata = { title: 'ORIGIN CMS Admin' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}

import { createSupabaseServerClient } from '@/lib/supabase-server'
import { AdminNav } from '@/components/admin/AdminNav'

export const metadata = { title: 'ORIGIN CMS Admin' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {session && <AdminNav userEmail={session?.user.email} />}
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}

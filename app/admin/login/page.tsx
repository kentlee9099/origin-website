'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('请输入有效邮箱'),
  password: z.string().min(6, '密码至少6位'),
})
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [serverError, setServerError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async ({ email, password }: FormData) => {
    setServerError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setServerError(error.message); return }
    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-light text-white tracking-tight mb-1">ORIGIN CMS</h1>
        <p className="text-sm text-gray-500 mb-8">管理员登录</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input {...register('email')} type="email" placeholder="邮箱地址" autoComplete="email"
              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors" />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <input {...register('password')} type="password" placeholder="密码" autoComplete="current-password"
              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors" />
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
          </div>
          {serverError && (
            <p className="text-xs text-red-400 bg-red-950/50 border border-red-900 px-3 py-2 rounded">{serverError}</p>
          )}
          <button type="submit" disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium py-3 rounded transition-colors">
            {isSubmitting ? '登录中...' : '登 录'}
          </button>
        </form>
      </div>
    </div>
  )
}

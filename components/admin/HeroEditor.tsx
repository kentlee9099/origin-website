'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  headline: z.string().min(1, '必填'), headline_highlight: z.string().min(1, '必填'),
  subtitle: z.string().min(1, '必填'), cta_primary_label: z.string().min(1, '必填'),
  cta_primary_href: z.string().min(1, '必填'), cta_secondary_label: z.string().optional(),
  cta_secondary_href: z.string().optional(),
})
type FormData = z.infer<typeof schema>

interface Props { defaultValues?: Partial<FormData> }

export function HeroEditor({ defaultValues }: Props) {
  const [saved, setSaved] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema), defaultValues })

  const onSubmit = async (data: FormData) => {
    await fetch('/api/admin/hero', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  const fields = [
    { name: 'headline',           label: '主标题',           placeholder: '中亚与俄罗斯大宗贸易专家' },
    { name: 'headline_highlight', label: '高亮词（蓝色）',    placeholder: '专家' },
    { name: 'subtitle',           label: '副标题',           placeholder: '专注大宗商品...' },
    { name: 'cta_primary_label',  label: 'CTA 主按钮文字',   placeholder: '获取报价' },
    { name: 'cta_primary_href',   label: 'CTA 主按钮链接',   placeholder: '/contact' },
    { name: 'cta_secondary_label',label: 'CTA 次按钮文字',   placeholder: '了解更多' },
    { name: 'cta_secondary_href', label: 'CTA 次按钮链接',   placeholder: '#about' },
  ] as const

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-xl">
      {fields.map(f => (
        <div key={f.name}>
          <label className="text-xs text-gray-400 uppercase tracking-wide">{f.label}</label>
          <input {...register(f.name)} placeholder={f.placeholder}
            className="mt-1 w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
          {errors[f.name] && <p className="text-xs text-red-400 mt-1">{errors[f.name]?.message}</p>}
        </div>
      ))}
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
          {isSubmitting ? '保存中...' : '保存更改'}
        </button>
        {saved && <span className="text-xs text-green-400">✓ 已保存，前台将在 60s 内更新</span>}
      </div>
    </form>
  )
}

'use client'
import { useForm, type FieldValues, type DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'

export interface FieldDef {
  name: string; label: string; type: 'text' | 'textarea' | 'url' | 'number' | 'email'
  placeholder?: string; required?: boolean; rows?: number
}
interface Props<T extends FieldValues> {
  fields: FieldDef[]; defaultValues: DefaultValues<T>; schema: z.ZodSchema<T>
  onSubmit: (data: T) => Promise<void>; submitLabel?: string; successMessage?: string
}

export function ContentForm<T extends FieldValues>({
  fields, defaultValues, schema, onSubmit, submitLabel = '保存', successMessage,
}: Props<T>) {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } =
    useForm<T>({ resolver: zodResolver(schema as any), defaultValues })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 bg-gray-900 border border-gray-800 rounded-xl p-6">
      {fields.map(field => (
        <div key={field.name} className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-400 font-medium tracking-wide uppercase">
            {field.label}{field.required && <span className="text-red-400 ml-0.5">*</span>}
          </label>
          {field.type === 'textarea' ? (
            <textarea {...register(field.name as any)} rows={field.rows ?? 4} placeholder={field.placeholder}
              className="bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-blue-500 resize-y transition-colors" />
          ) : (
            <input {...register(field.name as any, { valueAsNumber: field.type === 'number' })} type={field.type} placeholder={field.placeholder}
              className="bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-blue-500 transition-colors" />
          )}
          {(errors as Record<string, { message?: string }>)[field.name] && (
            <p className="text-xs text-red-400">{(errors as Record<string, { message?: string }>)[field.name]?.message}</p>
          )}
        </div>
      ))}
      <div className="flex items-center gap-4 pt-2 border-t border-gray-800">
        <button type="submit" disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
          {isSubmitting ? '保存中...' : submitLabel}
        </button>
        {isSubmitSuccessful && successMessage && <span className="text-xs text-green-400">{successMessage}</span>}
      </div>
    </form>
  )
}

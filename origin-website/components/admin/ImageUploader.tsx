'use client'
import { useState, useCallback, useRef } from 'react'
import Image from 'next/image'

interface Props { label?: string; currentUrl?: string | null; section: string; onUpload: (url: string) => void }

export function ImageUploader({ label = '图片', currentUrl, section, onUpload }: Props) {
  const [url, setUrl]           = useState<string | null>(currentUrl ?? null)
  const [uploading, setUploading] = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const upload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) { setError('请选择图片文件'); return }
    if (file.size > 10 * 1024 * 1024)   { setError('文件不能超过 10MB'); return }
    setUploading(true); setError(null)
    const form = new FormData()
    form.append('file', file); form.append('section', section)
    try {
      const res = await fetch('/api/admin/media/upload', { method: 'POST', body: form })
      if (!res.ok) { const { error } = await res.json(); throw new Error(error ?? 'Upload failed') }
      const { publicUrl } = await res.json()
      setUrl(publicUrl); onUpload(publicUrl)
    } catch (e) { setError(String(e)) }
    finally { setUploading(false) }
  }, [section, onUpload])

  const onDrop   = useCallback((e: React.DragEvent) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) upload(f) }, [upload])
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) upload(f) }, [upload])

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">{label}</p>
      <div onDrop={onDrop} onDragOver={e => e.preventDefault()} onClick={() => inputRef.current?.click()}
        className="relative h-44 bg-gray-950 border-2 border-dashed border-gray-800 hover:border-blue-600 rounded-xl cursor-pointer transition-colors overflow-hidden">
        {url ? (
          <>
            <Image src={url} alt="Preview" fill className="object-cover opacity-70" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-xs text-white bg-black/70 px-3 py-1.5 rounded-full">点击或拖拽替换</span>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-gray-600">
            <span className="text-4xl">↑</span>
            <span className="text-sm">点击或拖拽上传图片</span>
            <span className="text-xs">JPG / PNG / WebP · 最大 10MB · 自动转 WebP</span>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2">
            <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 animate-pulse w-full" /></div>
            <span className="text-xs text-gray-400">上传中，请稍候...</span>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={onChange} className="sr-only" />
      {error && <p className="text-xs text-red-400">{error}</p>}
      {url   && <p className="text-[10px] text-gray-600 break-all font-mono">{url}</p>}
    </div>
  )
}

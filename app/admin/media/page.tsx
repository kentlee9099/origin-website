import Image from 'next/image'
import { getAdminMedia } from '@/lib/data'

export default async function MediaPage() {
const assets = (await getAdminMedia()) as any[]
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-light text-white">媒体库</h1>
          <p className="text-xs text-gray-500 mt-0.5">{assets.length} 张图片</p>
        </div>
      </div>
      {assets.length === 0 ? (
        <p className="text-sm text-gray-600">暂无图片，请在各内容页面上传图片</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {assets.map((asset) => (
            <div key={asset.id} className="group relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
              <div className="relative aspect-video">
                <Image src={asset.public_url} alt={asset.alt_text ?? asset.original_name} fill className="object-cover"
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" />
              </div>
              <div className="p-2">
                <p className="text-[10px] text-gray-400 truncate">{asset.original_name}</p>
                <p className="text-[10px] text-gray-600">{asset.width}×{asset.height} · {Math.round(asset.size_bytes / 1024)}KB</p>
              </div>
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => navigator.clipboard.writeText(asset.public_url)}
                  className="text-[11px] text-white bg-blue-600 px-3 py-1.5 rounded hover:bg-blue-500 transition-colors">
                  复制 URL
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

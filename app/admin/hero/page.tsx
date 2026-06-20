import { getHeroContent } from '@/lib/data'
import { HeroEditor } from '@/components/admin/HeroEditor'

export default async function HeroPage() {
  const hero = await getHeroContent()
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-light text-white">Hero 首屏</h1>
          <p className="text-xs text-gray-500 mt-0.5">编辑首屏标题、副标题和 CTA 按钮</p>
        </div>
        <a href="/" target="_blank" rel="noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 border border-blue-900 px-3 py-1.5 rounded transition-colors">
          预览前台 ↗
        </a>
      </div>
      <HeroEditor defaultValues={hero ?? undefined} />
    </>
  )
}

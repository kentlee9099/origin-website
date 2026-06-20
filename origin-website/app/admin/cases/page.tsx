import Link from 'next/link'
import { getAdminCases } from '@/lib/data'
import { SortableList } from '@/components/admin/SortableList'

export default async function CasesPage() {
  const cases = await getAdminCases()
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-light text-white">成功案例</h1>
          <p className="text-xs text-gray-500 mt-0.5">拖拽调整显示顺序 · 点击编辑 · 新增/删除</p>
        </div>
        <Link href="/admin/cases/new"
          className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition-colors">
          + 新增案例
        </Link>
      </div>
      <SortableList items={cases} table="cases" editHref="/admin/cases" apiPath="/api/admin/cases" revalidateTag="cases" />
    </>
  )
}

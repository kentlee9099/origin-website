'use client'
import { useState, useCallback } from 'react'
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Link from 'next/link'

interface Item { id: string; title?: string; name?: string; text?: string; is_visible?: boolean }
interface Props { items: Item[]; table: string; editHref: string; apiPath: string; revalidateTag: string }

function SortableRow({ item, editHref, onToggle, onDelete }: {
  item: Item; editHref: string; onToggle: (id: string, v: boolean) => void; onDelete: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }
  const label = item.title ?? item.name ?? item.text ?? item.id
  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
      <button {...attributes} {...listeners} className="text-gray-600 hover:text-gray-400 cursor-grab active:cursor-grabbing text-lg leading-none flex-shrink-0" aria-label="拖拽排序">⠿</button>
      <span className="flex-1 text-sm text-gray-200 truncate min-w-0">{label}</span>
      {item.is_visible !== undefined && (
        <button onClick={() => onToggle(item.id, !item.is_visible)}
          className={['text-[10px] px-2 py-0.5 rounded-full border transition-colors',
            item.is_visible ? 'border-green-800 text-green-400 hover:border-red-800 hover:text-red-400'
              : 'border-gray-700 text-gray-500 hover:border-green-800 hover:text-green-400'].join(' ')}>
          {item.is_visible ? '显示' : '隐藏'}
        </button>
      )}
      <Link href={`${editHref}/${item.id}`} className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0">编辑</Link>
      <button onClick={() => onDelete(item.id)} className="text-xs text-gray-600 hover:text-red-400 transition-colors flex-shrink-0">删除</button>
    </div>
  )
}

export function SortableList({ items: init, table, editHref, apiPath }: Props) {
  const [items, setItems] = useState(init)
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }))

  const handleDragEnd = useCallback(async (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const next = arrayMove(items, items.findIndex(i => i.id === active.id), items.findIndex(i => i.id === over.id))
    setItems(next)
    await fetch('/api/admin/reorder', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ table, ids: next.map(i => i.id) }) })
  }, [items, table])

  const handleToggle = useCallback(async (id: string, visible: boolean) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, is_visible: visible } : i))
    await fetch(apiPath, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, is_visible: visible }) })
  }, [apiPath])

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('确定删除这条记录？')) return
    setItems(prev => prev.filter(i => i.id !== id))
    await fetch(apiPath, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
  }, [apiPath])

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {items.length === 0 && <p className="text-sm text-gray-600 py-8 text-center">暂无数据</p>}
          {items.map(item => (
            <SortableRow key={item.id} item={item} editHref={editHref} onToggle={handleToggle} onDelete={handleDelete} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

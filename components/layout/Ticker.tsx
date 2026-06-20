import type { Database } from '@/types/database'
type TickerItem = Database['public']['Tables']['ticker_items']['Row']
interface Props { items: TickerItem[] }

export function Ticker({ items }: Props) {
  if (items.length === 0) return null
  const doubled = [...items, ...items]
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] overflow-hidden whitespace-nowrap border-t border-by bg-by-bg-alt h-10 flex items-center" aria-hidden="true">
      <div className="inline-flex animate-ticker gap-16 will-change-transform">
        {doubled.map((item, i) => (
          <span key={`${item.id}-${i}`} className="text-[11px] tracking-[0.08em]">
            <span className="text-by-12">live · </span>
            {item.link_url
              ? <a href={item.link_url} className="text-by-55 hover:text-by-text transition-colors">{item.text}</a>
              : <span className="text-by-55">{item.text}</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

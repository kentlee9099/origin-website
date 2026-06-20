interface Props { num: string; label: string }
export function SectionLabel({ num, label }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[11px] tracking-[0.18em] uppercase text-by-28 tabular-nums font-semibold">{num}</span>
      <span className="w-4 h-px bg-by-28" />
      <span className="text-[11px] tracking-[0.18em] uppercase text-by-55 font-semibold">{label}</span>
    </div>
  )
}

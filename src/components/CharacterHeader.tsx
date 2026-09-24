import { useMemo } from 'react'
import { useTreeStore } from '../store/useTreeStore'
import { treeStats, formatCurrency } from '../utils/skillTreeLogic'
import { LIFE_AREAS } from '../types'
import { ThemeToggle } from './ThemeToggle'

export function CharacterHeader() {
  const trees = useTreeStore((s) => s.trees)

  const { totalSpent, totalBudget, totalNodes, totalCompleted, areaBreakdown } = useMemo(() => {
    let totalSpent = 0
    let totalBudget = 0
    let totalNodes = 0
    let totalCompleted = 0
    const areaBreakdown: Record<string, { completed: number; total: number }> = {}
    for (const tree of trees) {
      const stats = treeStats(tree)
      totalSpent += stats.earnedCost
      totalBudget += stats.totalCost
      totalNodes += stats.total
      totalCompleted += stats.completed
      const bucket = areaBreakdown[tree.area] ?? { completed: 0, total: 0 }
      bucket.completed += stats.completed
      bucket.total += stats.total
      areaBreakdown[tree.area] = bucket
    }
    return { totalSpent, totalBudget, totalNodes, totalCompleted, areaBreakdown }
  }, [trees])

  const spentPct = totalBudget ? Math.round((totalSpent / totalBudget) * 100) : 0

  return (
    <header className="flex items-center gap-6 border-b border-ink-200 bg-surface/90 px-5 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold-500 bg-gold-50 text-lg shadow-glow shadow-gold-400/30">
          💰
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">Invested</div>
          <div className="w-40">
            <div className="h-2 overflow-hidden rounded-full bg-ink-200">
              <div className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400" style={{ width: `${spentPct}%` }} />
            </div>
            <div className="mt-0.5 text-[10px] text-ink-500">
              {formatCurrency(totalSpent)} / {formatCurrency(totalBudget)} spent
            </div>
          </div>
        </div>
      </div>

      <div className="hidden h-8 w-px bg-ink-200 sm:block" />

      <div className="hidden gap-4 sm:flex">
        <Stat label="Total Cost" value={formatCurrency(totalBudget)} />
        <Stat label="Skills Mastered" value={`${totalCompleted}/${totalNodes}`} />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-3 lg:flex">
          {LIFE_AREAS.map((area) => {
            const b = areaBreakdown[area.id]
            if (!b || b.total === 0) return null
            return (
              <div key={area.id} className="flex items-center gap-1.5 rounded-full bg-ink-100 px-2.5 py-1" title={area.label}>
                <span className="text-sm">{area.icon}</span>
                <span className="text-[11px] font-medium text-ink-700">
                  {b.completed}/{b.total}
                </span>
              </div>
            )
          })}
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">{label}</div>
      <div className="font-display text-lg font-bold text-ink-900">{value}</div>
    </div>
  )
}

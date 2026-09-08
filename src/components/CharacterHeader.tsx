import { useMemo } from 'react'
import { useTreeStore } from '../store/useTreeStore'
import { treeStats, levelFromXp } from '../utils/skillTreeLogic'
import { LIFE_AREAS } from '../types'
import { ThemeToggle } from './ThemeToggle'

export function CharacterHeader() {
  const trees = useTreeStore((s) => s.trees)

  const { totalEarned, totalNodes, totalCompleted, areaBreakdown } = useMemo(() => {
    let totalEarned = 0
    let totalNodes = 0
    let totalCompleted = 0
    const areaBreakdown: Record<string, { earned: number; completed: number; total: number }> = {}
    for (const tree of trees) {
      const stats = treeStats(tree)
      totalEarned += stats.earnedXp
      totalNodes += stats.total
      totalCompleted += stats.completed
      const bucket = areaBreakdown[tree.area] ?? { earned: 0, completed: 0, total: 0 }
      bucket.earned += stats.earnedXp
      bucket.completed += stats.completed
      bucket.total += stats.total
      areaBreakdown[tree.area] = bucket
    }
    return { totalEarned, totalNodes, totalCompleted, areaBreakdown }
  }, [trees])

  const { level, xpIntoLevel, xpForNextLevel } = levelFromXp(totalEarned)
  const levelPct = Math.round((xpIntoLevel / xpForNextLevel) * 100)

  return (
    <header className="flex items-center gap-6 border-b border-ink-200 bg-surface/90 px-5 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold-500 bg-gold-50 font-display text-lg font-bold text-gold-600 shadow-glow shadow-gold-400/30">
          {level}
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">Level</div>
          <div className="w-40">
            <div className="h-2 overflow-hidden rounded-full bg-ink-200">
              <div className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400" style={{ width: `${levelPct}%` }} />
            </div>
            <div className="mt-0.5 text-[10px] text-ink-500">
              {xpIntoLevel} / {xpForNextLevel} XP to next level
            </div>
          </div>
        </div>
      </div>

      <div className="hidden h-8 w-px bg-ink-200 sm:block" />

      <div className="hidden gap-4 sm:flex">
        <Stat label="Total XP" value={totalEarned} />
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

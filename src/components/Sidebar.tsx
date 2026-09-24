import { useState } from 'react'
import { useTreeStore } from '../store/useTreeStore'
import { LIFE_AREAS } from '../types'
import { treeStats, formatCurrency } from '../utils/skillTreeLogic'
import { NewTreeModal } from './NewTreeModal'

export function Sidebar() {
  const trees = useTreeStore((s) => s.trees)
  const activeTreeId = useTreeStore((s) => s.activeTreeId)
  const setActiveTree = useTreeStore((s) => s.setActiveTree)
  const deleteTree = useTreeStore((s) => s.deleteTree)
  const [showNewTree, setShowNewTree] = useState(false)
  const [collapsedAreas, setCollapsedAreas] = useState<Record<string, boolean>>({})

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-ink-200 bg-surface/80 backdrop-blur">
      <div className="border-b border-ink-200 px-4 py-4">
        <h1 className="font-display text-xl font-bold tracking-wide text-gold-600">Skill Tree</h1>
        <p className="mt-0.5 text-xs text-ink-500">Your quest log for growth</p>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3">
        {LIFE_AREAS.map((area) => {
          const areaTrees = trees.filter((t) => t.area === area.id)
          if (areaTrees.length === 0) return null
          const collapsed = collapsedAreas[area.id]
          return (
            <div key={area.id} className="mb-2">
              <button
                onClick={() => setCollapsedAreas((c) => ({ ...c, [area.id]: !c[area.id] }))}
                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs font-bold uppercase tracking-wider text-ink-500 hover:bg-ink-100"
              >
                <span>{area.icon}</span>
                <span className="flex-1">{area.label}</span>
                <span className="text-[10px]">{collapsed ? '▸' : '▾'}</span>
              </button>
              {!collapsed && (
                <div className="mt-1 flex flex-col gap-1">
                  {areaTrees.map((tree) => {
                    const stats = treeStats(tree)
                    const active = tree.id === activeTreeId
                    return (
                      <button
                        key={tree.id}
                        onClick={() => setActiveTree(tree.id)}
                        className={`group relative flex flex-col gap-1.5 rounded-lg border px-3 py-2 text-left transition-colors ${
                          active
                            ? 'border-gold-500/60 bg-gold-50'
                            : 'border-transparent bg-ink-50 hover:border-ink-300 hover:bg-ink-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base leading-none">{tree.icon}</span>
                          <span className="flex-1 truncate text-sm font-semibold text-ink-900">{tree.name}</span>
                          <span
                            onClick={(e) => {
                              e.stopPropagation()
                              if (confirm(`Delete "${tree.name}" and all its nodes?`)) deleteTree(tree.id)
                            }}
                            className="hidden shrink-0 text-ink-400 hover:text-ember-500 group-hover:block"
                            title="Delete path"
                          >
                            ✕
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-200">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${stats.pct}%`, backgroundColor: tree.color }}
                          />
                        </div>
                        <div className="text-[10px] text-ink-500">
                          {stats.completed}/{stats.total} mastered &middot; {formatCurrency(stats.earnedCost)} spent
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="border-t border-ink-200 p-3">
        <button
          onClick={() => setShowNewTree(true)}
          className="w-full rounded-lg border border-gold-500/50 bg-gold-50 px-3 py-2 text-sm font-semibold text-gold-600 transition-colors hover:bg-gold-100"
        >
          + New Learning Path
        </button>
      </div>

      {showNewTree && <NewTreeModal onClose={() => setShowNewTree(false)} />}
    </aside>
  )
}

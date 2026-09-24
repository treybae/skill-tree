import { useState } from 'react'
import { nanoid } from 'nanoid'
import { useTreeStore } from '../store/useTreeStore'
import { NODE_ICONS, type SkillTree } from '../types'
import { deriveStatus, defaultNewNode } from '../utils/skillTreeLogic'

const STATUS_OPTIONS: { id: 'available' | 'in-progress' | 'completed'; label: string }[] = [
  { id: 'available', label: 'Not Started' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'completed', label: 'Mastered' },
]

export function NodeEditorPanel({ tree }: { tree: SkillTree }) {
  const selectedNodeId = useTreeStore((s) => s.selectedNodeId)
  const setSelectedNode = useTreeStore((s) => s.setSelectedNode)
  const updateNode = useTreeStore((s) => s.updateNode)
  const deleteNode = useTreeStore((s) => s.deleteNode)
  const addNode = useTreeStore((s) => s.addNode)
  const renameTree = useTreeStore((s) => s.renameTree)

  const [newResourceLabel, setNewResourceLabel] = useState('')
  const [newResourceUrl, setNewResourceUrl] = useState('')

  const node = tree.nodes.find((n) => n.id === selectedNodeId)

  const handleAddNode = () => {
    const id = addNode(tree.id, defaultNewNode(tree))
    setSelectedNode(id)
  }

  if (!node) {
    return (
      <aside className="flex h-full w-80 shrink-0 flex-col border-l border-ink-200 bg-surface/80 backdrop-blur">
        <div className="border-b border-ink-200 px-4 py-4">
          <input
            value={tree.name}
            onChange={(e) => renameTree(tree.id, { name: e.target.value })}
            className="w-full bg-transparent font-display text-lg font-bold text-ink-900 outline-none focus:text-gold-600"
          />
          <textarea
            value={tree.description}
            onChange={(e) => renameTree(tree.id, { description: e.target.value })}
            rows={3}
            placeholder="Describe this path..."
            className="mt-1.5 w-full resize-none rounded bg-transparent text-sm text-ink-500 outline-none focus:bg-ink-50 focus:px-2 focus:py-1"
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="text-4xl">{tree.icon}</div>
          <p className="text-sm text-ink-500">Select a node to view details, or add a new skill to this path.</p>
          <button
            onClick={handleAddNode}
            className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            + Add Skill Node
          </button>
          <p className="mt-2 text-[11px] text-ink-400">
            Tip: drag from a node's edge to another node to connect them as a prerequisite.
          </p>
        </div>
      </aside>
    )
  }

  const status = deriveStatus(tree, node.id)
  const isLocked = status === 'locked'

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col overflow-y-auto border-l border-ink-200 bg-surface/80 backdrop-blur">
      <div className="flex items-center justify-between border-b border-ink-200 px-4 py-3">
        <button onClick={() => setSelectedNode(null)} className="text-xs text-ink-500 hover:text-ink-800">
          &larr; Back
        </button>
        <button
          onClick={() => {
            if (confirm(`Delete "${node.title}"?`)) deleteNode(tree.id, node.id)
          }}
          className="text-xs text-ember-500 hover:text-ember-600"
        >
          Delete Node
        </button>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {isLocked && (
          <div className="rounded-lg border border-ink-200 bg-ink-50 px-3 py-2 text-xs text-ink-600">
            🔒 Locked &mdash; complete all prerequisite skills to unlock.
          </div>
        )}

        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex flex-wrap gap-1">
              {NODE_ICONS.map((i) => (
                <button
                  key={i}
                  onClick={() => updateNode(tree.id, node.id, { icon: i })}
                  className={`flex h-6 w-6 items-center justify-center rounded text-xs ${
                    node.icon === i ? 'bg-gold-100 ring-1 ring-gold-500' : 'hover:bg-ink-100'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
          <input
            value={node.title}
            onChange={(e) => updateNode(tree.id, node.id, { title: e.target.value })}
            className="w-full rounded-lg border border-ink-300 bg-surface px-3 py-2 font-display text-base font-semibold text-ink-900 outline-none focus:border-gold-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-ink-500">Description</label>
          <textarea
            value={node.description}
            onChange={(e) => updateNode(tree.id, node.id, { description: e.target.value })}
            rows={3}
            className="w-full resize-none rounded-lg border border-ink-300 bg-surface px-3 py-2 text-sm text-ink-900 outline-none focus:border-gold-500"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-semibold text-ink-500">$ Cost</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-500">$</span>
              <input
                type="number"
                min={0}
                step="0.01"
                value={node.cost}
                onChange={(e) => updateNode(tree.id, node.id, { cost: Math.max(0, Number(e.target.value) || 0) })}
                className="w-full rounded-lg border border-ink-300 bg-surface py-2 pl-6 pr-3 text-sm text-ink-900 outline-none focus:border-gold-500"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-xs font-semibold text-ink-500">Status</label>
            <select
              value={node.manualStatus}
              disabled={isLocked}
              onChange={(e) => updateNode(tree.id, node.id, { manualStatus: e.target.value as typeof node.manualStatus })}
              className="w-full rounded-lg border border-ink-300 bg-surface px-3 py-2 text-sm text-ink-900 outline-none focus:border-gold-500 disabled:opacity-50"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-ink-500">Notes</label>
          <textarea
            value={node.notes}
            onChange={(e) => updateNode(tree.id, node.id, { notes: e.target.value })}
            rows={3}
            placeholder="Personal notes, journal, progress log..."
            className="w-full resize-none rounded-lg border border-ink-300 bg-surface px-3 py-2 text-sm text-ink-900 outline-none focus:border-gold-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-ink-500">Resources</label>
          <div className="flex flex-col gap-1.5">
            {node.resources.map((r) => (
              <div key={r.id} className="flex items-center gap-2 rounded-lg border border-ink-200 bg-ink-50 px-2.5 py-1.5">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 truncate text-xs text-arcane-500 hover:underline"
                  title={r.url}
                >
                  {r.label || r.url}
                </a>
                <button
                  onClick={() =>
                    updateNode(tree.id, node.id, { resources: node.resources.filter((x) => x.id !== r.id) })
                  }
                  className="text-ink-400 hover:text-ember-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex flex-col gap-1.5">
            <input
              value={newResourceLabel}
              onChange={(e) => setNewResourceLabel(e.target.value)}
              placeholder="Label (e.g. Course, Book)"
              className="w-full rounded-lg border border-ink-300 bg-surface px-2.5 py-1.5 text-xs text-ink-900 outline-none focus:border-gold-500"
            />
            <div className="flex gap-1.5">
              <input
                value={newResourceUrl}
                onChange={(e) => setNewResourceUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 rounded-lg border border-ink-300 bg-surface px-2.5 py-1.5 text-xs text-ink-900 outline-none focus:border-gold-500"
              />
              <button
                onClick={() => {
                  if (!newResourceUrl.trim()) return
                  updateNode(tree.id, node.id, {
                    resources: [
                      ...node.resources,
                      { id: nanoid(), label: newResourceLabel.trim(), url: newResourceUrl.trim() },
                    ],
                  })
                  setNewResourceLabel('')
                  setNewResourceUrl('')
                }}
                className="rounded-lg bg-ink-100 px-3 text-xs font-semibold text-ink-700 hover:bg-ink-200"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

import { useState } from 'react'
import { useTreeStore } from '../store/useTreeStore'
import { LIFE_AREAS, NODE_ICONS, type LifeArea } from '../types'

const COLORS = ['#7357ff', '#e0b04a', '#3fc981', '#ff6a3d', '#4fb3e8', '#e35fd0']

export function NewTreeModal({ onClose }: { onClose: () => void }) {
  const createTree = useTreeStore((s) => s.createTree)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [area, setArea] = useState<LifeArea>('professional')
  const [color, setColor] = useState(COLORS[0])
  const [icon, setIcon] = useState(NODE_ICONS[0])

  const submit = () => {
    if (!name.trim()) return
    createTree({ name: name.trim(), description: description.trim(), area, color, icon })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl border border-ink-600 bg-ink-900 p-5 shadow-2xl"
      >
        <h2 className="font-display text-lg font-bold text-gold-400">Begin a New Path</h2>
        <div className="mt-4 flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-400">Path Name</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="e.g. Public Speaking Mastery"
              className="w-full rounded-lg border border-ink-600 bg-ink-850 px-3 py-2 text-sm text-ink-100 outline-none focus:border-gold-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-400">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="What is this journey about?"
              className="w-full resize-none rounded-lg border border-ink-600 bg-ink-850 px-3 py-2 text-sm text-ink-100 outline-none focus:border-gold-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-400">Life Area</label>
            <div className="flex flex-wrap gap-1.5">
              {LIFE_AREAS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setArea(a.id)}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    area === a.id
                      ? 'border-gold-500 bg-gold-500/15 text-gold-300'
                      : 'border-ink-600 text-ink-300 hover:border-ink-500'
                  }`}
                >
                  {a.icon} {a.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-400">Color</label>
              <div className="flex gap-1.5">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    style={{ backgroundColor: c }}
                    className={`h-7 w-7 rounded-full border-2 ${color === c ? 'border-white' : 'border-transparent'}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-400">Icon</label>
              <div className="flex flex-wrap gap-1 max-w-[160px]">
                {NODE_ICONS.slice(0, 8).map((i) => (
                  <button
                    key={i}
                    onClick={() => setIcon(i)}
                    className={`flex h-7 w-7 items-center justify-center rounded-lg border text-sm ${
                      icon === i ? 'border-gold-500 bg-gold-500/15' : 'border-ink-600'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm text-ink-400 hover:text-ink-200">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={!name.trim()}
            className="rounded-lg bg-gold-500 px-4 py-1.5 text-sm font-semibold text-ink-950 transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Create Path
          </button>
        </div>
      </div>
    </div>
  )
}

import { memo } from 'react'
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'
import type { NodeStatus, SkillNodeData } from '../types'

export type SkillFlowNodeData = SkillNodeData & {
  status: NodeStatus
  accentColor: string
  [key: string]: unknown
}

export type FlowSkillNode = Node<SkillFlowNodeData, 'skill'>

const STATUS_STYLES: Record<NodeStatus, string> = {
  locked: 'border-ink-600 bg-ink-850/70 text-ink-400 opacity-60 grayscale',
  available: 'border-arcane-400 bg-ink-850 text-arcane-100 shadow-arcane-500/40 shadow-glow',
  'in-progress': 'border-gold-500 bg-ink-850 text-gold-100 shadow-gold-500/50 shadow-glow animate-pulseGlow',
  completed: 'border-leaf-400 bg-ink-800 text-leaf-100 shadow-leaf-400/50 shadow-glow',
}

const STATUS_LABEL: Record<NodeStatus, string> = {
  locked: 'Locked',
  available: 'Ready',
  'in-progress': 'In Progress',
  completed: 'Mastered',
}

function SkillNodeInner({ data, selected }: NodeProps<FlowSkillNode>) {
  const status = data.status

  return (
    <div
      className={`group relative flex w-52 flex-col gap-1 rounded-xl border-2 px-3 py-2.5 font-body transition-all duration-200 ${STATUS_STYLES[status]} ${
        selected ? 'ring-2 ring-gold-400 ring-offset-2 ring-offset-ink-950' : ''
      }`}
      style={status !== 'locked' ? { borderColor: status === 'available' ? data.accentColor : undefined } : undefined}
    >
      <Handle type="target" position={Position.Left} className="!h-3 !w-3 !border-2 !border-ink-950 !bg-gold-500" />
      <Handle type="source" position={Position.Right} className="!h-3 !w-3 !border-2 !border-ink-950 !bg-gold-500" />

      <div className="flex items-center justify-between gap-2">
        <span className="text-lg leading-none">{status === 'locked' ? '🔒' : data.icon}</span>
        <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-semibold tracking-wide">
          {data.xp} XP
        </span>
      </div>
      <div className="font-display text-sm font-semibold leading-tight">{data.title}</div>
      <div className="line-clamp-2 text-[11px] leading-snug text-ink-300">{data.description}</div>
      <div
        className={`mt-1 w-fit rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
          status === 'completed'
            ? 'bg-leaf-500/20 text-leaf-300'
            : status === 'in-progress'
              ? 'bg-gold-500/20 text-gold-300'
              : status === 'available'
                ? 'bg-arcane-500/20 text-arcane-300'
                : 'bg-ink-700/50 text-ink-400'
        }`}
      >
        {STATUS_LABEL[status]}
      </div>
    </div>
  )
}

export const SkillNode = memo(SkillNodeInner)

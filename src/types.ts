export type NodeStatus = 'locked' | 'available' | 'in-progress' | 'completed'

export type LifeArea = 'professional' | 'personal' | 'knowledge' | 'skills' | 'achievements'

export interface SkillResource {
  id: string
  label: string
  url: string
}

export interface SkillNodeData {
  id: string
  title: string
  description: string
  cost: number
  /** manual status; 'locked' is derived automatically when prerequisites are unmet */
  manualStatus: Exclude<NodeStatus, 'locked'>
  notes: string
  resources: SkillResource[]
  position: { x: number; y: number }
  icon: string
}

export interface SkillEdgeData {
  id: string
  source: string
  target: string
}

export interface SkillTree {
  id: string
  name: string
  description: string
  area: LifeArea
  color: string
  icon: string
  nodes: SkillNodeData[]
  edges: SkillEdgeData[]
  createdAt: number
}

export const LIFE_AREAS: { id: LifeArea; label: string; icon: string }[] = [
  { id: 'professional', label: 'Professional', icon: '⚒️' },
  { id: 'personal', label: 'Personal', icon: '🌙' },
  { id: 'knowledge', label: 'Knowledge', icon: '📖' },
  { id: 'skills', label: 'Skills', icon: '⚔️' },
  { id: 'achievements', label: 'Achievements', icon: '🏆' },
]

export const NODE_ICONS = ['⭐', '🔥', '⚔️', '🛡️', '📖', '🧪', '🔮', '🗝️', '🏹', '💎', '⚡', '🌟', '🎯', '🧭', '🏆']

import type { NodeStatus, SkillNodeData, SkillTree } from '../types'
import { NODE_ICONS } from '../types'

/**
 * A node is only ever 'locked' due to unmet prerequisites - manualStatus tracks
 * the player's actual progress once a node becomes reachable, so completing a
 * prereq later doesn't erase in-progress/completed work on dependents.
 */
export function deriveStatus(tree: SkillTree, nodeId: string): NodeStatus {
  const node = tree.nodes.find((n) => n.id === nodeId)
  if (!node) return 'locked'

  const prereqEdges = tree.edges.filter((e) => e.target === nodeId)
  if (prereqEdges.length === 0) return node.manualStatus

  const allPrereqsComplete = prereqEdges.every((e) => {
    const source = tree.nodes.find((n) => n.id === e.source)
    return source && deriveStatus(tree, source.id) === 'completed'
  })

  if (!allPrereqsComplete) return 'locked'
  return node.manualStatus
}

export function treeStats(tree: SkillTree) {
  let totalCost = 0
  let earnedCost = 0
  let completed = 0
  let inProgress = 0
  for (const node of tree.nodes) {
    totalCost += node.cost
    const status = deriveStatus(tree, node.id)
    if (status === 'completed') {
      earnedCost += node.cost
      completed++
    } else if (status === 'in-progress') {
      inProgress++
    }
  }
  return {
    totalCost,
    earnedCost,
    completed,
    inProgress,
    total: tree.nodes.length,
    pct: tree.nodes.length ? Math.round((completed / tree.nodes.length) * 100) : 0,
  }
}

export function formatCurrency(amount: number): string {
  const formatted = Number.isInteger(amount)
    ? amount.toLocaleString('en-US')
    : amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return `$${formatted}`
}

/** Grid layout for newly-added nodes so they don't all stack on top of each other. */
export function nextNodePosition(tree: SkillTree) {
  const x = 60 + (tree.nodes.length % 5) * 40
  const y = 60 + Math.floor(tree.nodes.length / 5) * 140
  return { x, y }
}

export function defaultNewNode(tree: SkillTree): Omit<SkillNodeData, 'id'> {
  return {
    title: 'New Skill',
    description: '',
    cost: 50,
    manualStatus: 'available',
    notes: '',
    resources: [],
    position: nextNodePosition(tree),
    icon: NODE_ICONS[tree.nodes.length % NODE_ICONS.length],
  }
}

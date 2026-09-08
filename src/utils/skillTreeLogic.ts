import type { NodeStatus, SkillTree } from '../types'

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
  let totalXp = 0
  let earnedXp = 0
  let completed = 0
  let inProgress = 0
  for (const node of tree.nodes) {
    totalXp += node.xp
    const status = deriveStatus(tree, node.id)
    if (status === 'completed') {
      earnedXp += node.xp
      completed++
    } else if (status === 'in-progress') {
      inProgress++
    }
  }
  return {
    totalXp,
    earnedXp,
    completed,
    inProgress,
    total: tree.nodes.length,
    pct: tree.nodes.length ? Math.round((completed / tree.nodes.length) * 100) : 0,
  }
}

/** Simple RPG-ish level curve: each level needs progressively more XP. */
export function levelFromXp(xp: number) {
  let level = 1
  let remaining = xp
  let needed = 100
  while (remaining >= needed) {
    remaining -= needed
    level++
    needed = Math.round(needed * 1.25)
  }
  return { level, xpIntoLevel: remaining, xpForNextLevel: needed }
}

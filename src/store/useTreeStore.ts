import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import type { LifeArea, SkillEdgeData, SkillNodeData, SkillTree } from '../types'
import { buildSeedTrees } from '../utils/seedData'

interface TreeStore {
  trees: SkillTree[]
  activeTreeId: string | null
  selectedNodeId: string | null

  setActiveTree: (id: string) => void
  setSelectedNode: (id: string | null) => void

  createTree: (input: { name: string; description: string; area: LifeArea; color: string; icon: string }) => string
  renameTree: (id: string, patch: Partial<Pick<SkillTree, 'name' | 'description' | 'area' | 'color' | 'icon'>>) => void
  deleteTree: (id: string) => void

  addNode: (treeId: string, node: Omit<SkillNodeData, 'id'>) => string
  updateNode: (treeId: string, nodeId: string, patch: Partial<SkillNodeData>) => void
  deleteNode: (treeId: string, nodeId: string) => void
  moveNode: (treeId: string, nodeId: string, position: { x: number; y: number }) => void

  addEdge: (treeId: string, edge: Omit<SkillEdgeData, 'id'>) => void
  deleteEdge: (treeId: string, edgeId: string) => void
}

const seedTrees = buildSeedTrees()

export const useTreeStore = create<TreeStore>()(
  persist(
    (set) => ({
      trees: seedTrees,
      activeTreeId: seedTrees[0]?.id ?? null,
      selectedNodeId: null,

      setActiveTree: (id) => set({ activeTreeId: id, selectedNodeId: null }),
      setSelectedNode: (id) => set({ selectedNodeId: id }),

      createTree: (input) => {
        const id = nanoid()
        const tree: SkillTree = {
          id,
          name: input.name,
          description: input.description,
          area: input.area,
          color: input.color,
          icon: input.icon,
          nodes: [],
          edges: [],
          createdAt: Date.now(),
        }
        set((state) => ({ trees: [...state.trees, tree], activeTreeId: id, selectedNodeId: null }))
        return id
      },

      renameTree: (id, patch) => {
        set((state) => ({
          trees: state.trees.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        }))
      },

      deleteTree: (id) => {
        set((state) => {
          const trees = state.trees.filter((t) => t.id !== id)
          const activeTreeId = state.activeTreeId === id ? (trees[0]?.id ?? null) : state.activeTreeId
          return { trees, activeTreeId, selectedNodeId: null }
        })
      },

      addNode: (treeId, node) => {
        const id = nanoid()
        set((state) => ({
          trees: state.trees.map((t) =>
            t.id === treeId ? { ...t, nodes: [...t.nodes, { ...node, id }] } : t
          ),
        }))
        return id
      },

      updateNode: (treeId, nodeId, patch) => {
        set((state) => ({
          trees: state.trees.map((t) =>
            t.id === treeId
              ? { ...t, nodes: t.nodes.map((n) => (n.id === nodeId ? { ...n, ...patch } : n)) }
              : t
          ),
        }))
      },

      deleteNode: (treeId, nodeId) => {
        set((state) => ({
          trees: state.trees.map((t) =>
            t.id === treeId
              ? {
                  ...t,
                  nodes: t.nodes.filter((n) => n.id !== nodeId),
                  edges: t.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
                }
              : t
          ),
          selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
        }))
      },

      moveNode: (treeId, nodeId, position) => {
        set((state) => ({
          trees: state.trees.map((t) =>
            t.id === treeId
              ? { ...t, nodes: t.nodes.map((n) => (n.id === nodeId ? { ...n, position } : n)) }
              : t
          ),
        }))
      },

      addEdge: (treeId, edge) => {
        set((state) => ({
          trees: state.trees.map((t) => {
            if (t.id !== treeId) return t
            const exists = t.edges.some((e) => e.source === edge.source && e.target === edge.target)
            if (exists || edge.source === edge.target) return t
            return { ...t, edges: [...t.edges, { ...edge, id: nanoid() }] }
          }),
        }))
      },

      deleteEdge: (treeId, edgeId) => {
        set((state) => ({
          trees: state.trees.map((t) =>
            t.id === treeId ? { ...t, edges: t.edges.filter((e) => e.id !== edgeId) } : t
          ),
        }))
      },
    }),
    {
      name: 'skill-tree-storage',
      onRehydrateStorage: () => (state) => {
        if (state && !state.activeTreeId && state.trees.length > 0) {
          state.activeTreeId = state.trees[0].id
        }
      },
    }
  )
)

export function getActiveTree(state: TreeStore): SkillTree | null {
  return state.trees.find((t) => t.id === state.activeTreeId) ?? null
}

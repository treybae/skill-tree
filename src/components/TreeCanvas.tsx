import { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  type Connection,
  type Edge,
  type NodeMouseHandler,
  type OnNodesChange,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useTreeStore } from '../store/useTreeStore'
import { deriveStatus } from '../utils/skillTreeLogic'
import { SkillNode, type FlowSkillNode } from './SkillNode'
import type { SkillTree } from '../types'

const nodeTypes = { skill: SkillNode }

export function TreeCanvas({ tree }: { tree: SkillTree }) {
  const moveNode = useTreeStore((s) => s.moveNode)
  const addEdge = useTreeStore((s) => s.addEdge)
  const deleteEdge = useTreeStore((s) => s.deleteEdge)
  const setSelectedNode = useTreeStore((s) => s.setSelectedNode)
  const selectedNodeId = useTreeStore((s) => s.selectedNodeId)

  const flowNodes: FlowSkillNode[] = useMemo(
    () =>
      tree.nodes.map((n) => ({
        id: n.id,
        type: 'skill' as const,
        position: n.position,
        selected: n.id === selectedNodeId,
        data: { ...n, status: deriveStatus(tree, n.id), accentColor: tree.color },
      })),
    [tree, selectedNodeId]
  )

  const flowEdges: Edge[] = useMemo(
    () =>
      tree.edges.map((e) => {
        const targetStatus = deriveStatus(tree, e.target)
        const sourceStatus = deriveStatus(tree, e.source)
        const active = sourceStatus === 'completed'
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          animated: active && targetStatus !== 'completed',
          style: {
            stroke: active ? tree.color : '#3a2f57',
            strokeWidth: active ? 2.5 : 1.5,
          },
        }
      }),
    [tree]
  )

  const onNodesChange: OnNodesChange<FlowSkillNode> = useCallback(
    (changes) => {
      for (const change of changes) {
        if (change.type === 'position' && change.position) {
          moveNode(tree.id, change.id, change.position)
        }
      }
    },
    [moveNode, tree.id]
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return
      addEdge(tree.id, { source: connection.source, target: connection.target })
    },
    [addEdge, tree.id]
  )

  const onEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      if (confirm('Remove this connection?')) {
        deleteEdge(tree.id, edge.id)
      }
    },
    [deleteEdge, tree.id]
  )

  const onNodeClick: NodeMouseHandler<FlowSkillNode> = useCallback(
    (_, node) => {
      setSelectedNode(node.id)
    },
    [setSelectedNode]
  )

  const onPaneClick = useCallback(() => setSelectedNode(null), [setSelectedNode])

  return (
    <ReactFlow
      nodes={flowNodes}
      edges={flowEdges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onEdgeClick={onEdgeClick}
      onPaneClick={onPaneClick}
      fitView
      proOptions={{ hideAttribution: true }}
      defaultEdgeOptions={{ type: 'smoothstep' }}
      minZoom={0.2}
      maxZoom={1.5}
    >
      <Background variant={BackgroundVariant.Dots} gap={22} size={1.2} color="#3a2f57" />
      <Controls className="!bg-ink-800 !border-ink-600 [&_button]:!bg-ink-800 [&_button]:!border-ink-600 [&_button]:!fill-ink-200 [&_button:hover]:!bg-ink-700" />
      <MiniMap
        pannable
        zoomable
        className="!bg-ink-900 !border !border-ink-700"
        maskColor="rgba(10, 8, 18, 0.75)"
        nodeColor={(n) => (n.data?.accentColor as string) ?? '#7357ff'}
      />
    </ReactFlow>
  )
}

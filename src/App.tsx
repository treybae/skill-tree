import { useEffect } from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import { useTreeStore } from './store/useTreeStore'
import { useResolvedTheme } from './store/useThemeStore'
import { Sidebar } from './components/Sidebar'
import { CharacterHeader } from './components/CharacterHeader'
import { TreeCanvas } from './components/TreeCanvas'
import { NodeEditorPanel } from './components/NodeEditorPanel'

function App() {
  const trees = useTreeStore((s) => s.trees)
  const activeTreeId = useTreeStore((s) => s.activeTreeId)
  const activeTree = trees.find((t) => t.id === activeTreeId) ?? null

  const resolvedTheme = useResolvedTheme()
  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-ink-50 text-ink-900">
      <CharacterHeader />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="relative min-w-0 flex-1">
          {activeTree ? (
            <ReactFlowProvider>
              <TreeCanvas tree={activeTree} />
            </ReactFlowProvider>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-ink-500">
              <div className="text-4xl">🗺️</div>
              <p>No path selected. Create a learning path to begin your quest.</p>
            </div>
          )}
        </main>
        {activeTree && <NodeEditorPanel tree={activeTree} />}
      </div>
    </div>
  )
}

export default App

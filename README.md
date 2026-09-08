# Skill Tree

An interactive, RPG-style skill tree for planning your own development — professional, personal, knowledge, skills, and achievements — as branching learning paths you unlock node by node.

## Features

- **Multiple learning paths ("trees")** grouped by life area (Professional, Personal, Knowledge, Skills, Achievements)
- **Node-based skill graph** built on an interactive canvas — drag nodes to reposition, drag from a node's edge to another node to set it as a prerequisite
- **RPG-style progression** — nodes are `locked` 🔒 until their prerequisites are mastered, then become `available`, `in-progress`, or `completed`, with glowing status styling
- **XP & leveling** — each skill node carries an XP value; your character levels up as you complete nodes, with a level curve and progress bar
- **Rich node details** — title, description, personal notes, and linked resources (courses, articles, docs) per skill
- **Everything persists locally** in the browser (`localStorage`) — no account or backend required

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

### Build for production

```bash
npm run build
npm run preview
```

## Tech stack

- React + TypeScript + Vite
- [@xyflow/react](https://reactflow.dev/) for the interactive node canvas
- Zustand (with `persist`) for state management and local storage
- Tailwind CSS for styling

## Usage

- Click **+ New Learning Path** in the sidebar to start a new tree, choose a life area, color, and icon.
- Click **+ Add Skill Node** (shown when no node is selected) to add a skill to the active path.
- Click any node to edit its title, description, XP, status, notes, and resource links in the right-hand panel.
- Drag from the small dot on the right edge of a node to another node to connect them as a prerequisite — the target stays locked until the source is completed.
- Click an edge to remove a connection.
- Drag nodes to arrange your tree layout; positions are saved automatically.

import { nanoid } from 'nanoid'
import type { SkillTree } from '../types'

export function buildSeedTrees(): SkillTree[] {
  const now = Date.now()

  const backend: SkillTree = {
    id: nanoid(),
    name: 'Backend Engineering Mastery',
    description: 'Level up from solid fundamentals to distributed-systems expertise.',
    area: 'professional',
    color: '#7357ff',
    icon: '⚒️',
    createdAt: now,
    nodes: [
      { id: 'b1', title: 'REST API Fundamentals', description: 'Design clean, resource-oriented APIs.', xp: 50, manualStatus: 'completed', notes: '', resources: [], position: { x: 0, y: 0 }, icon: '📖' },
      { id: 'b2', title: 'Databases & SQL', description: 'Schema design, indexing, transactions.', xp: 60, manualStatus: 'completed', notes: '', resources: [], position: { x: 260, y: -80 }, icon: '🗝️' },
      { id: 'b3', title: 'Authentication & Security', description: 'OAuth2, JWTs, secure session handling.', xp: 70, manualStatus: 'in-progress', notes: 'Working through OAuth2 flows.', resources: [], position: { x: 260, y: 80 }, icon: '🛡️' },
      { id: 'b4', title: 'Caching Strategies', description: 'Redis, CDN caching, cache invalidation.', xp: 60, manualStatus: 'available', notes: '', resources: [], position: { x: 520, y: -80 }, icon: '⚡' },
      { id: 'b5', title: 'Message Queues', description: 'Async processing with Kafka/RabbitMQ.', xp: 80, manualStatus: 'available', notes: '', resources: [], position: { x: 520, y: 80 }, icon: '🔮' },
      { id: 'b6', title: 'Distributed Systems', description: 'Consensus, sharding, CAP theorem.', xp: 120, manualStatus: 'available', notes: '', resources: [], position: { x: 780, y: 0 }, icon: '🌟' },
    ],
    edges: [
      { id: nanoid(), source: 'b1', target: 'b3' },
      { id: nanoid(), source: 'b2', target: 'b3' },
      { id: nanoid(), source: 'b2', target: 'b4' },
      { id: nanoid(), source: 'b3', target: 'b5' },
      { id: nanoid(), source: 'b4', target: 'b6' },
      { id: nanoid(), source: 'b5', target: 'b6' },
    ],
  }

  const fitness: SkillTree = {
    id: nanoid(),
    name: 'Strength & Endurance',
    description: 'Build a sustainable, injury-free fitness practice.',
    area: 'personal',
    color: '#3fc981',
    icon: '🌙',
    createdAt: now,
    nodes: [
      { id: 'f1', title: 'Consistent Habit', description: '3x/week for 8 weeks straight.', xp: 40, manualStatus: 'completed', notes: '', resources: [], position: { x: 0, y: 0 }, icon: '🎯' },
      { id: 'f2', title: 'Proper Form', description: 'Squat, deadlift, press with good technique.', xp: 50, manualStatus: 'in-progress', notes: '', resources: [], position: { x: 260, y: 0 }, icon: '⚔️' },
      { id: 'f3', title: '5K Run', description: 'Run 5K without stopping.', xp: 60, manualStatus: 'available', notes: '', resources: [], position: { x: 520, y: -70 }, icon: '🏹' },
      { id: 'f4', title: 'Bodyweight Milestones', description: 'Pull-up, pistol squat, handstand hold.', xp: 90, manualStatus: 'available', notes: '', resources: [], position: { x: 520, y: 70 }, icon: '💎' },
    ],
    edges: [
      { id: nanoid(), source: 'f1', target: 'f2' },
      { id: nanoid(), source: 'f2', target: 'f3' },
      { id: nanoid(), source: 'f2', target: 'f4' },
    ],
  }

  return [backend, fitness]
}

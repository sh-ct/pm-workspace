import { Task, TaskAssignee, Board, Column } from 'types';
import { MOCK_USERS } from '../users/users.mock';

// NOTE: string IDs used here for readability while eyeballing fixtures.
// Real create flows should use crypto.randomUUID() (UUID v4) or a v7
// library if you want time-sortable IDs — see the earlier discussion
// on client-generatable IDs for optimistic create/drag-drop.

export const MOCK_BOARDS: Board[] = [
  { id: 'board-1', name: 'Product Launch', description: 'Q3 launch tracking' },
  { id: 'board-2', name: 'Bug Triage', description: 'Incoming bugs and fixes' },
];

export const MOCK_COLUMNS: Column[] = [
  { id: 'col-1', boardId: 'board-1', name: 'Backlog', order: 1000 },
  { id: 'col-2', boardId: 'board-1', name: 'In Progress', order: 2000 },
  { id: 'col-3', boardId: 'board-1', name: 'Done', order: 3000 },

  { id: 'col-4', boardId: 'board-2', name: 'Backlog', order: 1000 },
  { id: 'col-5', boardId: 'board-2', name: 'In Progress', order: 2000 },
  { id: 'col-6', boardId: 'board-2', name: 'Done', order: 3000 },
];

const assignees: TaskAssignee[] = MOCK_USERS.map(({ id, name, avatarUrl }) => ({ id, name, avatarUrl }))

export const MOCK_TASKS: Task[] = [
  {
    id: 'task-1',
    boardId: 'board-1',
    columnId: 'col-3', // Done
    order: 1000,
    title: 'Set up Nx workspace with Angular monorepo',
    description: 'Initial scaffolding: apps/board, libs/ui, libs/data-access, libs/util.',
    priority: 'high',
    assignee: assignees[0],
    tags: ['setup', 'infra'],
    dueDate: '2026-07-10',
    createdAt: '2026-06-28T09:00:00Z',
    updatedAt: '2026-07-10T14:32:00Z',
  },
  {
    id: 'task-2',
    boardId: 'board-1',
    columnId: 'col-3', // Done
    order: 2000,
    title: 'Configure Tailwind + Spartan UI layering',
    description: 'Merge Nx source-scoping with Spartan\u2019s explicit layer imports.',
    priority: 'medium',
    assignee: assignees[1],
    tags: ['styling', 'infra'],
    dueDate: '2026-07-15',
    createdAt: '2026-07-01T10:15:00Z',
    updatedAt: '2026-07-15T11:00:00Z',
  },
  {
    id: 'task-3',
    boardId: 'board-1',
    columnId: 'col-2', // In Progress
    order: 1000,
    title: 'Design TaskCardComponent',
    description: 'Presentational card for libs/ui — title, assignee avatar, priority badge.',
    priority: 'high',
    assignee: assignees[2],
    tags: ['ui', 'design'],
    dueDate: '2026-07-25',
    createdAt: '2026-07-14T08:45:00Z',
    updatedAt: '2026-07-22T16:20:00Z',
  },
  {
    id: 'task-4',
    boardId: 'board-1',
    columnId: 'col-2', // In Progress
    order: 2000,
    title: 'Build TasksService in data-access',
    description: 'HTTP client wrapper with getTasksForBoard/updateTaskColumn methods.',
    priority: 'high',
    assignee: assignees[3],
    tags: ['data-access', 'backend-integration'],
    dueDate: '2026-07-28',
    createdAt: '2026-07-16T13:00:00Z',
    updatedAt: '2026-07-22T09:10:00Z',
  },
  {
    id: 'task-5',
    boardId: 'board-1',
    columnId: 'col-1', // Backlog
    order: 1000,
    title: 'Implement drag-and-drop between columns',
    description: 'Use Angular CDK drag-drop to move tasks between columns.',
    priority: 'medium',
    assignee: assignees[0],
    tags: ['ui', 'feature'],
    dueDate: '2026-08-02',
    createdAt: '2026-07-18T11:30:00Z',
    updatedAt: '2026-07-18T11:30:00Z',
  },
  {
    id: 'task-6',
    boardId: 'board-1',
    columnId: 'col-1', // Backlog
    order: 2000,
    title: 'Add task filtering by assignee and priority',
    priority: 'low',
    tags: [],
    createdAt: '2026-07-19T15:00:00Z',
    updatedAt: '2026-07-19T15:00:00Z',
  },
  {
    id: 'task-7',
    boardId: 'board-2',
    columnId: 'col-5', // In Progress
    order: 1000,
    title: 'Fix task card overflow on long titles',
    description: 'Long titles break the card layout on narrow columns.',
    priority: 'urgent',
    assignee: assignees[1],
    tags: ['bug', 'ui'],
    dueDate: '2026-07-24',
    createdAt: '2026-07-20T09:00:00Z',
    updatedAt: '2026-07-22T17:45:00Z',
  },
  {
    id: 'task-8',
    boardId: 'board-2',
    columnId: 'col-4', // Backlog
    order: 1000,
    title: 'Investigate duplicate task creation on double-click',
    priority: 'high',
    assignee: assignees[2],
    tags: ['bug'],
    createdAt: '2026-07-21T10:00:00Z',
    updatedAt: '2026-07-21T10:00:00Z',
  },
];

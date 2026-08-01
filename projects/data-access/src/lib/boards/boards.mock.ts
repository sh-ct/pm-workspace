import { Board, Column } from 'types';

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

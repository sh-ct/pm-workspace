export const TASKS_ENDPOINTS = {
  byBoard: (boardId: string) => `boards/${boardId}/tasks`,
  byId: (id: string) => `tasks/${id}`,
  base: 'tasks',
} as const;

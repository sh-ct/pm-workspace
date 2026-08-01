export const BOARDS_ENDPOINTS = {
  base: 'boards',
  byId: (id: string) => `boards/${id}`,
  columns: (boardId: string) => `boards/${boardId}/columns`,
  columnById: (boardId: string, columnId: string) => `boards/${boardId}/columns/${columnId}`,
} as const;

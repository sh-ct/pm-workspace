export const USERS_ENDPOINTS = {
  base: 'users',
  byId: (id: string) => `users/${id}`,
  search: 'users/search',
} as const;

import { User } from 'types';

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Amara Okafor',
    email: 'amara.okafor@example.com',
    createdAt: '2026-01-14T09:00:00Z',
  },
  {
    id: 'user-2',
    name: 'Liam Chen',
    email: 'liam.chen@example.com',
    avatarUrl: 'https://i.pravatar.cc/40?u=user-2',
    createdAt: '2026-02-02T11:30:00Z',
  },
  {
    id: 'user-3',
    name: 'Priya Nair',
    email: 'priya.nair@example.com',
    avatarUrl: 'https://i.pravatar.cc/40?u=user-3',
    createdAt: '2026-02-20T14:15:00Z',
  },
  {
    id: 'user-4',
    name: 'Tom Whitfield',
    email: 'tom.whitfield@example.com',
    avatarUrl: 'https://i.pravatar.cc/40?u=user-4',
    createdAt: '2026-03-05T08:45:00Z',
  },
  {
    // Deliberately shares initials (AO) with Amara Okafor — no
    // avatarUrl, so this one renders via the initials+color fallback.
    // Useful for eyeballing that the color-hash actually keeps two
    // "AO" users visually distinct on the same board.
    id: 'user-5',
    name: 'Alex Owusu',
    email: 'alex.owusu@example.com',
    createdAt: '2026-04-10T10:00:00Z',
  },
];

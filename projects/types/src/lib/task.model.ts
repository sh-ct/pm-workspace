export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TaskAssignee {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Task {
  id: string;
  boardId: string;
  columnId: string;
  order: number; // position within the column
  title: string;
  description?: string;
  priority: TaskPriority;
  assignee?: TaskAssignee;
  tags: string[];
  dueDate?: string; // Timestamps
  createdAt: string; // Timestamps
  updatedAt: string; // Timestamps
}

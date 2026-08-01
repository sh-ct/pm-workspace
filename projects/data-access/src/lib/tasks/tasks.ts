import { inject, Service, signal } from '@angular/core';
import { EntityApiService, EntityApiState } from 'entity';
import { Task } from 'types';
import { API_BASE_URL, USE_MOCK_DATA } from 'api-config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MOCK_TASKS } from './tasks.mock';
import { TASKS_ENDPOINTS } from './tasks.endpoints';

const MOCK_DATA_DELAY = 1000;
export type TasksState = EntityApiState<Task>;


@Service()
export class Tasks extends EntityApiService<Task, TasksState> {
  #http = inject(HttpClient);
  #baseUrl = inject(API_BASE_URL);
  useMockData = inject(USE_MOCK_DATA);

  _state = signal<TasksState>(this.getInitialState());

  override getInitialState(): TasksState {
    return {
      isLoading: false,
      entities: {},
    } as TasksState;
  }

  getTasksForBoard(boardId: string): void {
    this.startLoad();
    if (this.useMockData) {
      setTimeout(
        () => this.endLoadSuccess(MOCK_TASKS.filter((task: Task) => task.boardId === boardId)),
        MOCK_DATA_DELAY
      );
    } else {
      this.#http.get<Task[]>(`${this.#baseUrl}/${TASKS_ENDPOINTS.byBoard(boardId)}`).subscribe({
        next: (tasks: Task[]) => this.endLoadSuccess(tasks),
        error: (error: HttpErrorResponse) => this.endLoadError(error),
      });
    }
  }
}

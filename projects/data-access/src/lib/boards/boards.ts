import { inject, Service, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_BASE_URL, USE_MOCK_DATA } from 'api-config';
import { Board } from 'types';
import { delay, Observable, of, tap } from 'rxjs';
import { MOCK_BOARDS } from './boards.mock';
import { BOARDS_ENDPOINTS } from './boards.endpoints';
import { EntityApiService, EntityApiState } from 'entity';

const MOCK_DATA_DELAY = 1000;


@Service()
export class Boards extends EntityApiService<Board, EntityApiState<Board>> {
  override _state = signal<EntityApiState<Board>>(this.getInitialState());
  #http = inject(HttpClient);
  #baseUrl = inject(API_BASE_URL);
  useMockData = inject(USE_MOCK_DATA)


  override getInitialState(): EntityApiState<Board> {
    return {
      isLoading: false,
      entities: {},
      error: null,
    };
  }

  getBoards(): void {
    this.setState({ isLoading: true, error: null });
    this.startLoad();
    if (this.useMockData) {
      setTimeout(
        () => this.endLoadSuccess(MOCK_BOARDS),
        MOCK_DATA_DELAY
      );
    } else {
      this.#http.get<Board[]>(`${this.#baseUrl}/${BOARDS_ENDPOINTS.base}`).subscribe({
        next: (boards: Board[]) => this.endLoadSuccess(boards),
        error: (error: HttpErrorResponse) => this.endLoadError(error),
      })
    }
  }

  getBoardByID(id: string): Observable<Board> {
    if (this.useMockData) {
      const board = MOCK_BOARDS.find(b => b.id === id);
      if (board) {
        return of(board).pipe(delay(MOCK_DATA_DELAY));
      } else {
        throw new Error(`Board not found: ${id}`);
      }
    }
    return this.#http.get<Board>(`${this.#baseUrl}/${BOARDS_ENDPOINTS.byId(id)}`);
  }

  deleteBoard(id: string): Observable<void> {
    if (this.useMockData) {
      return of(undefined).pipe(delay(MOCK_DATA_DELAY));
    }
    return this.#http.delete<void>(`${this.#baseUrl}/${BOARDS_ENDPOINTS.byId(id)}`).pipe(
      tap(() => this.manager.removeOne(id)),
    );
  }

  /*
  TODO:
   - Create Board
   - Update Board
   - Get Columns?
   - Create Column?
   - Update Column?
   - Delete Column?
   */
}

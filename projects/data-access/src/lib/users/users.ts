import { inject, Service, signal } from '@angular/core';
import { EntityApiService, EntityApiState } from 'entity';
import { User } from 'types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_BASE_URL, USE_MOCK_DATA } from 'api-config';
import { delay, of } from 'rxjs';
import { MOCK_USERS } from './users.mock';
import { USERS_ENDPOINTS } from './users.endpoints';

export type UsersState = EntityApiState<User>;
const MOCK_DATA_DELAY = 1000;


@Service()
export class Users extends EntityApiService<User, UsersState> {
  #http = inject(HttpClient);
  #baseUrl = inject(API_BASE_URL);
  useMockData = inject(USE_MOCK_DATA);

  _state = signal<EntityApiState<User>>(this.getInitialState());

  getInitialState(): UsersState {
    return {
      isLoading: false,
      entities: {},
    } as UsersState;
  }

  getUsers(): void {
    this.startLoad();
    if (USE_MOCK_DATA) {
      setTimeout(
        () => this.endLoadSuccess(MOCK_USERS),
        MOCK_DATA_DELAY
      );
    } else {
      this.#http.get<User[]>(`${this.#baseUrl}/${USERS_ENDPOINTS.base}`).subscribe({
        next: (users: User[]) => this.endLoadSuccess(users),
        error: (error: HttpErrorResponse) => this.endLoadError(error),
      });
    }
  }
}

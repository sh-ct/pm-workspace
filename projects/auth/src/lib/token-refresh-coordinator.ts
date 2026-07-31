import { inject, Injectable } from '@angular/core';
import { Observable, finalize, map, shareReplay } from 'rxjs';
import { AuthApiService } from './auth';
import { TokenStorageService } from './token-storage';

@Injectable({ providedIn: 'root' })
export class TokenRefreshCoordinator {
  authApi = inject(AuthApiService);
  tokenStorage = inject(TokenStorageService);

  private refreshInProgress$: Observable<string> | null = null;

  /**
   * Returns the new access token. If a refresh is already in flight,
   * every caller shares that same result instead of triggering a new
   * HTTP call — this is what prevents a burst of 401s from firing
   * multiple simultaneous refresh requests.
   */
  getRefreshedToken(): Observable<string> {
    if (this.refreshInProgress$) {
      return this.refreshInProgress$;
    }

    const refreshToken = this.tokenStorage.getRefreshToken();
    if (!refreshToken) {
      this.tokenStorage.clearTokens();
      throw new Error('No refresh token available');
    }

    this.refreshInProgress$ = this.authApi.refresh(refreshToken).pipe(
      map((tokens) => {
        this.tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
        return tokens.accessToken;
      }),
      shareReplay(1),
      finalize(() => {
        this.refreshInProgress$ = null;
      }),
    );

    return this.refreshInProgress$;
  }
}

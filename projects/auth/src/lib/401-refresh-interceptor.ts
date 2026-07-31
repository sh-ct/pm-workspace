import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenRefreshCoordinator } from './token-refresh-coordinator';
import { TokenStorageService } from './token-storage';

export const refreshOnUnauthorizedInterceptor: HttpInterceptorFn = (
  req,
  next,
) => {
  const coordinator = inject(TokenRefreshCoordinator);
  const tokenStorage = inject(TokenStorageService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isRefreshCall = req.url.includes('/auth/refresh');

      // Not a 401, or the refresh call itself failed — don't attempt
      // to refresh (that second case would infinite-loop otherwise).
      if (error.status !== 401 || isRefreshCall) {
        return throwError(() => error);
      }

      return coordinator.getRefreshedToken().pipe(
        switchMap((newAccessToken) => {
          const retried = req.clone({
            setHeaders: { Authorization: `Bearer ${newAccessToken}` },
          });
          // Sent directly to the backend from here — this interceptor
          // sits last in the chain (see app.config.ts), so `next` IS
          // effectively the backend at this point.
          return next(retried);
        }),
        catchError((refreshError) => {
          // Refresh token itself is invalid/expired — nothing left to
          // do but log the user out.
          tokenStorage.clearTokens();
          router.navigate(['/login']);
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};

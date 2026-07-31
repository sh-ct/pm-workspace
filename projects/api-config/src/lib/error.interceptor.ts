import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * Generic error logging/handling for anything NOT auth-related.
 * 401 handling now lives in libs/auth (refreshOnUnauthorizedInterceptor)
 * — keeping it out of here avoids two interceptors racing to handle
 * the same status code.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        console.error('Network error — API may be unreachable', error);
      } else if (error.status !== 401) {
        console.error(`API error ${error.status}:`, error.message);
      }

      return throwError(() => error);
    }),
  );
};

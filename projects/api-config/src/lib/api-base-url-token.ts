import { InjectionToken } from '@angular/core';

/**
 * Base URL for API requests. Must be provided by the consuming app —
 * see apps/board/src/app/app.config.ts for where it's set from
 * environment.ts.
 */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

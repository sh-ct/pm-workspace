import { InjectionToken } from '@angular/core';

/**
 * Base URL for API requests. Must be provided by the consuming app —
 * see apps/board/src/app/app.config.ts for where it's set from
 * environment.ts.
 */
export const USE_MOCK_DATA = new InjectionToken<string>('USE_MOCK_DATA');

import { HttpErrorResponse } from '@angular/common/http';

export interface EntityState<T> {
  entities: Entities<T>;
}

export interface EntityApiState<T extends Entity> extends EntityState<T> {
  isLoading: boolean;
  error: HttpErrorResponse | null;
}

export interface Entity {
  id: string;
}

export type Entities<T> = Record<string, T>;

export interface EntityUpdate<T extends Entity> {
  id: string;
  changes: Partial<T>;
}

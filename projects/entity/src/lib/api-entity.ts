import { EntityService } from './entity';
import { Entity, EntityApiState } from './entity.model';
import { computed } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export abstract class EntityApiService<
  T extends Entity,
  S extends EntityApiState<T>,
> extends EntityService<T, S> {

  isLoading = computed(() => this._state().isLoading);
  error = computed(() => this._state().error);

  startLoad(override?: Partial<S>): void {
    this.setState({
      isLoading: true,
      error: null,
      ...override,
    } as Partial<S>);
  }

  endLoadSuccess(value: T[], override?: Partial<S>): void {
    this.manager.setAll(
      value,
      {
        isLoading: false,
        error: null,
        ...override,
      } as Partial<S>
    );
  }

  endLoadError(error: HttpErrorResponse, override?: Partial<S>): void {
    this.setState({
      isLoading: false,
      error,
      ...override,
    } as Partial<S>);
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { computed, WritableSignal } from '@angular/core';

export interface LoadedState<T> {
  isLoading: boolean;
  data: Record<string|number, T>;
  error: HttpErrorResponse | null;
}

// TODO: Update to use entity type state

export function getInitialLoadedState<I, T extends LoadedState<I>>(state: Partial<T>): T {
  const baseData: LoadedState<I> = {
    isLoading: false,
    data: {},
    error: null,
  };
  return {
    ...baseData,
    ...state,
  } as T;
}


export abstract class StateService<T> {
  abstract _state: WritableSignal<LoadedState<T>>;

  isLoading = computed(() => this._state().isLoading);
  data = computed(() => this._state().data);
  ids = computed(() => Object.keys(this._state().data));
  items = computed(() => Object.values(this._state().data));
  entries = computed(() => Object.entries(this._state().data));
  error = computed(() => this._state().error);
  hasValue = computed(() => !this.error && this.ids().length);

  abstract getInitialState(): LoadedState<T>;

  setState(newState: Partial<LoadedState<T>>) {
    this._state.update((currentState) => ({ ...currentState, ...newState }));
  }

  resetState() {
    this._state.set(this.getInitialState());
  }

  // Are these good practice
  startLoad(override?: Partial<LoadedState<T>>): void {
    this.setState({
      isLoading: true,
      error: null,
      ...override,
    });
  }

  // Are these good practice
  endLoadSuccess(value: T[], override?: Partial<LoadedState<T>>): void {
    this.setState({
      isLoading: false,
      error: null,
      ...override,
      value,
    });
  }

  // Are these good practice
  endLoadError(error: HttpErrorResponse, override?: Partial<LoadedState<T>>): void {
    this.setState({
      isLoading: false,
      ...override,
      error,
    });
  }

  
}

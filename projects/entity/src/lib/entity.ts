import { EntityManager } from './entity-manager';
import { Entity, EntityState } from './entity.model';
import { computed, WritableSignal } from '@angular/core';

export abstract class EntityService<T extends Entity, S extends EntityState<T>> {

  abstract _state: WritableSignal<S>;

  entities = computed(() => this._state().entities);
  ids = computed(() => Object.keys(this._state().entities));
  items = computed(() => Object.values(this._state().entities));
  entries = computed(() => Object.entries(this._state().entities));
  hasValue = computed(() => this.ids().length > 0);
  count = computed(() => this.ids().length);
  state = computed(() => this._state());

  #manager?: EntityManager<T, S>;
  // Lazily get the manager so that it is only set on first access (after state is defined)
  get manager() {
    return (this.#manager ??= new EntityManager(this));
  }

  abstract getInitialState(): S;

  setState(newState: Partial<S>): S {
    this._state.update(state => ({ ...state, ...newState }));
    return this._state();
  }

  resetState(newState?: Partial<S>): S {
    this._state.set({ ...this.getInitialState(), ...newState });
    return this._state();
  }

}

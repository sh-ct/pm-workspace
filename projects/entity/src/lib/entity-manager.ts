import { WritableSignal } from '@angular/core';
import { Entities, Entity, EntityState, EntityUpdate } from './entity.model';
import { EntityService } from './entity';

export class EntityManager<T extends Entity, S extends EntityState<T>> {

  constructor(
    private getEntities: () => Entities<T>,
    private setState: (state: Partial<S>) => void,
  ) {}

  #mutate(
    fn: (entities: Entities<T>) => Entities<T>,
    extraData?: Partial<Omit<S, 'entities'>>,
  ): void {
    this.setState({
      entities: fn(this.getEntities()),
      ...extraData,
    } as Partial<S>);
  }

  addOne(entity: T, extraData?: Partial<Omit<S, 'entities'>>): void {
    this.#mutate((_entities) => {
      if (entity.id in _entities) {
        return _entities;
      }
      return { ..._entities, [entity.id]: entity };
    }, extraData);
  }

  addMany(entities: T[], extraData?: Partial<Omit<S, 'entities'>>): void {
    this.#mutate((_entities) => {
      const next = { ..._entities };
      entities.forEach((entity) => {
        if (!(entity.id in next)) {
          next[entity.id] = entity;
        }
      });
      return next;
    }, extraData);
  }

  setAll(entities: T[], extraData?: Partial<Omit<S, 'entities'>>): void {
    this.#mutate(() => entities.reduce((acc, entity) => ({ ...acc, [entity.id]: entity }), {}), extraData);
  }

  setOne(entity: T, extraData?: Partial<Omit<S, 'entities'>>): void {
    this.#mutate((_entities) => ({ ..._entities, [entity.id]: entity }), extraData);
  }

  removeOne(id: string, extraData?: Partial<Omit<S, 'entities'>>): void {
    this.#mutate((_entities) => {
      const next = { ..._entities };
      delete next[id];
      return next;
    }, extraData);
  }

  removeMany(ids: string[], extraData?: Partial<Omit<S, 'entities'>>): void {
    this.#mutate((_entities) => {
      const next = { ..._entities };
      ids.forEach((id) => delete next[id]);
      return next;
    }, extraData);
  }

  updateOne(update: EntityUpdate<T>, extraData?: Partial<Omit<S, 'entities'>>): void {
    this.#mutate((_entities) => {
      const next = { ..._entities };
      if (update.id in _entities) {
        next[update.id] = {
          ..._entities[update.id],
          ...update.changes,
        };
      }
      return next;
    }, extraData);
  }

  updateMany(updates: EntityUpdate<T>[], extraData?: Partial<Omit<S, 'entities'>>): void {
    this.#mutate((_entities) => {
      const next = { ..._entities };
      updates.forEach((update) => {
        if (update.id in _entities) {
          next[update.id] = {
            ..._entities[update.id],
            ...update.changes,
          };
        }
      });
      return next;
    }, extraData);
  }

  clearAll(extraData?: Partial<Omit<S, 'entities'>>): void {
    this.setAll([], extraData);
  }

  selectById(id: string): T | undefined {
    return this.getEntities()[id];
  }
}

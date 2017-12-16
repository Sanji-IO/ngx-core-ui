import { Action, Store } from '@ngrx/store';

import { AppState } from './../models/app';

export abstract class SjStoreService {
  protected store: Store<AppState>;

  protected select(state) {
    return this.store.select(state);
  }

  protected dispatch(action: Action) {
    this.store.dispatch(action);
  }
}

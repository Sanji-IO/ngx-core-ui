import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { ActionReducer, MetaReducer } from '@ngrx/store';

import { AppState } from '../models/app';

const stateSetter = function(reducer: ActionReducer<any, any>): ActionReducer<any, any> {
  return function(state: any, action: any) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
};

export const reducers: ActionReducerMap<AppState> = {
  routerReducer: routerReducer
};

export const metaReducers: MetaReducer<any, any>[] = [stateSetter];

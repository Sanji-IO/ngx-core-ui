import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { metaReducers, reducers } from './app.reducer';
import { CustomRouterStateSerializer } from '../route/route.state.helper';

@NgModule({
  imports: [StoreModule.forRoot(reducers, { metaReducers }), EffectsModule.forRoot([]), StoreRouterConnectingModule],
  providers: [
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
  exports: [StoreModule]
})
export class SjStoreModule {}

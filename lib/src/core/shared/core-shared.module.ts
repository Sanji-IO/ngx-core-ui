import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { LocalStorageService, Ng2Webstorage } from 'ngx-webstorage';

import { Session } from '../models/session';

const PRE_FIX = 'sj';

export function jwtOptionsFactory(localStorageService: LocalStorageService) {
  return {
    tokenGetter: () => {
      const sessionData = localStorageService.retrieve('session');
      return sessionData.token;
    }
  };
}

@NgModule({
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [LocalStorageService]
      }
    }),
    Ng2Webstorage.forRoot({ prefix: PRE_FIX }),
    ToastrModule.forRoot()
  ],
  exports: [JwtModule, Ng2Webstorage, ToastrModule]
})
export class SjCoreSharedModule {}

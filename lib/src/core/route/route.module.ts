import { RouterModule, Router } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SjRouteConfig } from '../models/route';
import { SjLoggerModule } from './../logger/logger.module';
import { SjSessionModule } from './../session/session.module';
import { IsUserSignedInGuard } from './is-user-signed-in.guard';
import { IsUserUnknownGuard } from './is-user-unknown.guard';
import { SJ_ROUTE_CONFIG } from './route.token';
import { SjRouteService } from './route.service';

@NgModule({
  imports: [SjLoggerModule, SjSessionModule, RouterModule.forRoot([])],
  providers: [IsUserSignedInGuard, IsUserUnknownGuard, SjRouteService],
  exports: [RouterModule]
})
export class SjRouteMoule {
  static forRoot(
    config: SjRouteConfig = {
      defaultLoginRoute: 'login',
      loginSuccessRedirectRoute: ''
    }
  ): ModuleWithProviders {
    return {
      ngModule: SjRouteMoule,
      providers: [
        {
          provide: SJ_ROUTE_CONFIG,
          useValue: config
        }
      ]
    };
  }
}

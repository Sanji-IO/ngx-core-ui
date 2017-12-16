import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SjSessionService } from '../session/session.service';
import { SjLoggerService } from './../logger/logger.service';
import { SjRouteConfig } from '../models/route';
import { SJ_ROUTE_CONFIG } from './route.token';

@Injectable()
export class IsUserUnknownGuard implements CanActivate {
  constructor(
    @Inject(SJ_ROUTE_CONFIG) private _config: SjRouteConfig,
    private _router: Router,
    private _session: SjSessionService,
    private _logger: SjLoggerService
  ) {
    if (this._config.loginSuccessRedirectRoute === '') {
      this._logger.log('SJ_ROUTE_CONFIG warning', 'Please set redirect route config for logined successfully.');
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this._session
      .isSignedIn()
      .do(isSignedIn => {
        if (isSignedIn === true) {
          this._router.navigate([this._config.loginSuccessRedirectRoute]);
        }
      })
      .map(isSignedIn => !isSignedIn);
  }
}

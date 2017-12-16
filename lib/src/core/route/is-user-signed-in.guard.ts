import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SjSessionService } from './../session/session.service';
import { SjRouteConfig } from '../models/route';
import { SJ_ROUTE_CONFIG } from './route.token';

@Injectable()
export class IsUserSignedInGuard implements CanActivate {
  constructor(
    @Inject(SJ_ROUTE_CONFIG) private _config: SjRouteConfig,
    private _router: Router,
    private _session: SjSessionService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this._session.isSignedIn().do(isSignedIn => {
      if (isSignedIn !== true) {
        this._router.navigate([this._config.defaultLoginRoute]);
      }
    });
  }
}

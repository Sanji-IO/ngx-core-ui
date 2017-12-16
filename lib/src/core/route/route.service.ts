import { SJ_ROUTE_CONFIG } from './route.token';
import { Router, Route } from '@angular/router';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class SjRouteService {
  constructor(private router: Router, @Inject(SJ_ROUTE_CONFIG) private config) {
    if (config.route) {
      this.register(config.route);
    }
  }

  register(route: Route | Route[]) {
    const config = this.router.config;
    const newConfig = Array.isArray(route) ? config.concat(route) : [...config, route];
    this.router.resetConfig(newConfig);
  }

  getRoutes(): Route[] {
    return this.router.config;
  }
}

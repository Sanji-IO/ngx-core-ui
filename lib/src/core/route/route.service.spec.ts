import { RouterModule, Route } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { SjRouteService } from './route.service';
import { SJ_ROUTE_CONFIG } from './route.token';
import { TestBed } from '@angular/core/testing';

describe('Service: SjRouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: SJ_ROUTE_CONFIG, useValue: { route: [] } },
        SjRouteService
      ]
    });
  });

  it('should be injected', () => {
    const service = TestBed.get(SjRouteService);
    expect(service).toBeTruthy();
  });

  it('should return current route config', () => {
    const service = TestBed.get(SjRouteService);
    service.router.resetConfig([{ path: 'login', component: {} }]);
    expect(service.getRoutes()).toEqual([{ path: 'login', component: {} }]);
  });

  it('should provide register route function', () => {
    const service = TestBed.get(SjRouteService);
    const route = {
      path: 'home',
      component: {}
    };

    service.register(route);
    expect(service.getRoutes()).toContainEqual(route);

    const routes = [
      {
        path: 'login',
        component: {}
      }
    ];

    service.register(routes);
    expect(service.getRoutes()).toEqual([route, ...routes]);
  });
});

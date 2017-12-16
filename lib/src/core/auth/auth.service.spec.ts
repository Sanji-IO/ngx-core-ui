import 'rxjs/add/observable/of';

import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxPermissionsModule, NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';

import { SjRestService } from '../rest/rest.service';
import { SjSessionModule } from '../session/session.module';
import { SjSessionService } from '../session/session.service';
import { SjCoreSharedModule } from '../shared/core-shared.module';
import { Session } from '../models/session';
import { Credentials } from '../models/auth';
import { SjAuthService } from './auth.service';

describe('Service: SjAuthService', () => {
  let service: SjAuthService;
  let rest: SjRestService;
  let localStorageService: LocalStorageService;
  let jwtHelperService: JwtHelperService;
  let permissionsService: NgxPermissionsService;
  let rolesService: NgxRolesService;
  // tslint:disable-next-line:max-line-length
  const testToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

  class MockSjRestService {
    get(url) {
      return Observable.of({
        permissions: ['read:ethernet', 'edit:ethernet']
      });
    }
    post() {
      return Observable.of({
        data: {
          token: testToken
        }
      });
    }
  }

  beforeEach(() => {
    const data: Session = {
      user: {},
      token: testToken
    };
    window.localStorage.setItem('sj|session', JSON.stringify(data));
    function sjAuthServiceFactory(
      sessionService: SjSessionService,
      restService: SjRestService,
      permissions: NgxPermissionsService,
      roles: NgxRolesService,
      sjAuthConfig: string[]
    ) {
      return new SjAuthService(sessionService, restService, permissions, roles, sjAuthConfig);
    }
    const SJ_AUTH_CONFIG = new InjectionToken<string[]>('sjAuthConfig');
    TestBed.configureTestingModule({
      imports: [SjCoreSharedModule, SjSessionModule, NgxPermissionsModule.forRoot()],
      providers: [
        {
          provide: SjAuthService,
          useFactory: sjAuthServiceFactory,
          deps: [SjSessionService, SjRestService, NgxPermissionsService, NgxRolesService, SJ_AUTH_CONFIG]
        },
        {
          provide: SJ_AUTH_CONFIG,
          useValue: []
        },
        {
          provide: SjRestService,
          useClass: MockSjRestService
        }
      ]
    });
  });

  beforeEach(() => {
    rest = TestBed.get(SjRestService);
    localStorageService = TestBed.get(LocalStorageService);
    jwtHelperService = TestBed.get(JwtHelperService);
    permissionsService = TestBed.get(NgxPermissionsService);
    rolesService = TestBed.get(NgxRolesService);
    service = TestBed.get(SjAuthService);
  });

  test('it should be injected', () => {
    expect(service).toBeDefined();
  });

  test('it should have default permissions.', () => {
    expect(service.getAllPermission()).toEqual({});
  });

  test('it should send request to get permissions.', () => {
    service.fetchPermissions('/api/v1/permissions').subscribe(data => {
      expect(data).toEqual(['read:ethernet', 'edit:ethernet']);
    });
    expect(service.getAllPermission()).toEqual({});
  });

  test('should provide a way to configure permissions', () => {
    const session = new SjSessionService(localStorageService, jwtHelperService);
    const authService = new SjAuthService(session, rest, permissionsService, rolesService, ['ethernet']);
    expect(authService.getPermission('ethernet')).toEqual({ name: 'ethernet' });
  });

  test('should send login request to get token.', () => {
    const url = '/api/v1/login';
    const credentials: Credentials = {
      username: 'admin',
      password: 'admin'
    };
    service.attemptAuth(url, credentials).subscribe(token => {
      expect(token).toEqual(testToken);
    });
  });

  test('should confirm current user authentication state.', () => {
    expect(!service.isAuthenticated()).toBeTruthy();
  });

  test('should load current permission state.', () => {
    const permissions = ['ROOT', 'ADMIN', 'USER'];
    const spy = jest.spyOn(permissionsService, 'loadPermissions');
    service.loadPermissions(permissions);
    expect(spy).toHaveBeenCalled();
  });

  test('it should add permission.', () => {
    const permissions = ['write:message', 'read:message'];
    const spy = jest.spyOn(permissionsService, 'addPermission');
    service.addPermission(permissions);
    expect(spy).toHaveBeenCalled();
  });

  test('it should remove all permission.', () => {
    const spy = jest.spyOn(permissionsService, 'flushPermissions');
    service.removeAllPermission();
    expect(spy).toHaveBeenCalled();
  });

  test('it should remove a permission.', () => {
    const spy = jest.spyOn(permissionsService, 'removePermission');
    service.removePermission('read:message');
    expect(spy).toHaveBeenCalled();
  });

  test('it should get permissions.', () => {
    const spy = jest.spyOn(permissionsService, 'getPermissions');
    expect(service.getAllPermission()).toEqual({});
    expect(spy).toHaveBeenCalled();
  });

  test('it should get a permission.', () => {
    const spy = jest.spyOn(permissionsService, 'getPermission');
    permissionsService.addPermission('ethernet');
    expect(service.getPermission('ethernet')).toEqual({ name: 'ethernet' });
    expect(spy).toHaveBeenCalled();
  });

  test('it should get a role information.', () => {
    const spy = jest.spyOn(rolesService, 'getRole');
    rolesService.addRole('ROOT', ['read:message']);
    expect(service.getRole('ROOT')).toEqual({ name: 'ROOT', validationFunction: ['read:message'] });
    expect(spy).toHaveBeenCalled();
  });

  test('it should get all role information.', () => {
    const spy = jest.spyOn(rolesService, 'getRoles');
    rolesService.addRole('ROOT', ['read:message']);
    expect(service.getAllRole()).toEqual({ ROOT: { name: 'ROOT', validationFunction: ['read:message'] } });
    expect(spy).toHaveBeenCalled();
  });

  test('it should add multiple roles.', () => {
    const spy = jest.spyOn(rolesService, 'addRoles');
    service.addRoles({
      ROOT: [],
      ADMIN: [],
      USER: []
    });
    expect(service.getAllRole()).toEqual({
      ROOT: {
        name: 'ROOT',
        validationFunction: []
      },
      ADMIN: {
        name: 'ADMIN',
        validationFunction: []
      },
      USER: {
        name: 'USER',
        validationFunction: []
      }
    });
    expect(spy).toHaveBeenCalled();
  });

  test('it should add a role.', () => {
    const spy = jest.spyOn(rolesService, 'getRoles');
    service.addRole('ROOT', ['read:message']);
    expect(service.getAllRole()).toEqual({ ROOT: { name: 'ROOT', validationFunction: ['read:message'] } });
    expect(spy).toHaveBeenCalled();
  });

  test('it should remove whole roles.', () => {
    const spy = jest.spyOn(rolesService, 'flushRoles');
    service.addRole('ROOT', ['read:message']);
    service.removeAllRole();
    expect(service.getAllRole()).toEqual({});
    expect(spy).toHaveBeenCalled();
  });

  test('it should remove a role.', () => {
    const spy = jest.spyOn(rolesService, 'removeRole');
    service.addRole('ROOT', ['read:message']);
    service.addRole('ADMIN', ['read:message']);
    service.removeRole('ADMIN');
    expect(service.getAllRole()).toEqual({
      ROOT: {
        name: 'ROOT',
        validationFunction: ['read:message']
      }
    });
    expect(spy).toHaveBeenCalled();
  });
});

import { NgxPermissionsService, NgxRolesService, NgxRole } from 'ngx-permissions';
import { Observable } from 'rxjs/Observable';

import { SjSessionService } from '../session/session.service';
import { SjRestService } from './../rest/rest.service';
import { Credentials } from '../models/auth';

export class SjAuthService {
  private token: string | null;

  constructor(
    private session: SjSessionService,
    private rest: SjRestService,
    private permissionsService: NgxPermissionsService,
    private rolesService: NgxRolesService,
    private sjAuthConfig: string[] = []
  ) {
    this.loadPermissions(sjAuthConfig);
  }

  fetchPermissions(url: string): Observable<string[]> {
    return this.rest.get(url).map(data => data.permissions);
  }

  getAllPermission(): string[] {
    return this.permissionsService.getPermissions();
  }

  getPermission(name: string): {} {
    return this.permissionsService.getPermission(name);
  }

  isAuthenticated(): boolean {
    return this.session.isTokenExpired();
  }

  attemptAuth(url: string, credentials: Credentials): Observable<string> {
    return this.rest.post(url, credentials).map(res => {
      this.session.updateState({ token: res.data.token });
      return res.data.token;
    });
  }

  loadPermissions(permissions: string[], validation?: Function) {
    this.permissionsService.loadPermissions(permissions as string[], validation);
  }

  addPermission(permission: string | string[], validation?: Function) {
    this.permissionsService.addPermission(permission, validation);
  }

  removeAllPermission() {
    this.permissionsService.flushPermissions();
  }

  removePermission(permission: string) {
    this.permissionsService.removePermission(permission);
  }

  getAllRole(): {} {
    return this.rolesService.getRoles();
  }

  getRole(name: string): NgxRole {
    return this.rolesService.getRole(name);
  }

  addRoles(roles: {}) {
    this.rolesService.addRoles(roles);
  }

  addRole(role: string, permissions: string[] | Function) {
    this.rolesService.addRole(role, permissions);
  }

  removeAllRole() {
    this.rolesService.flushRoles();
  }

  removeRole(name: string) {
    this.rolesService.removeRole(name);
  }
}

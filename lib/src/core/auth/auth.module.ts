import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxPermissionsModule, NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

import { SjRestModule } from '../rest/rest.module';
import { SjRestService } from '../rest/rest.service';
import { SjSessionService } from '../session/session.service';
import { SjCoreSharedModule } from '../shared/core-shared.module';
import { SjSessionModule } from './../session/session.module';
import { SjAuthService } from './auth.service';

export const SJ_AUTH_CONFIG = new InjectionToken<string[]>('sjAuthConfig');

export function sjAuthServiceFactory(
  session: SjSessionService,
  rest: SjRestService,
  permissions: NgxPermissionsService,
  roles: NgxRolesService,
  sjAuthConfig: string[]
) {
  return new SjAuthService(session, rest, permissions, roles, sjAuthConfig);
}

@NgModule({
  imports: [SjCoreSharedModule, SjSessionModule, SjRestModule, NgxPermissionsModule.forRoot()]
})
export class SjAuthModule {
  static forRoot(config: string[] = []): ModuleWithProviders {
    return {
      ngModule: SjAuthModule,
      providers: [
        {
          provide: SjAuthService,
          useFactory: sjAuthServiceFactory,
          deps: [SjSessionService, SjRestService, NgxPermissionsService, NgxRolesService, SJ_AUTH_CONFIG]
        },
        {
          provide: SJ_AUTH_CONFIG,
          useValue: config
        }
      ]
    };
  }
}

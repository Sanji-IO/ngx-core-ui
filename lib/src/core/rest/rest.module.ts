import { HttpClient } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import { SjCoreSharedModule } from '../shared/core-shared.module';
import { SjRestConfig } from '../models/rest';
import { SjAuthRestService } from './auth-rest.service';
import { SjRestService } from './rest.service';

export const SJ_REST_CONFIG = new InjectionToken<SjRestConfig>('sjRestConfig');

export function sjRestFactory(http: Http, sjRestConfig: SjRestConfig) {
  return new SjRestService(http, sjRestConfig);
}

export function sjAuthRestFactory(http: HttpClient, sjRestConfig: SjRestConfig) {
  return new SjAuthRestService(http, sjRestConfig);
}

@NgModule({
  imports: [HttpModule, SjCoreSharedModule]
})
export class SjRestModule {
  static forRoot(config: SjRestConfig = { basePath: '' }): ModuleWithProviders {
    return {
      ngModule: SjRestModule,
      providers: [
        {
          provide: SjRestService,
          useFactory: sjRestFactory,
          deps: [Http, SJ_REST_CONFIG]
        },
        {
          provide: SjAuthRestService,
          useFactory: sjAuthRestFactory,
          deps: [HttpClient, SJ_REST_CONFIG]
        },
        { provide: SJ_REST_CONFIG, useValue: config }
      ]
    };
  }
}

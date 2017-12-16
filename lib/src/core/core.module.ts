import './rx-imports';
import 'hammerjs';

import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SJ_AUTH_CONFIG, SjAuthModule } from './auth/auth.module';
import { SjExceptionModule } from './exception/exception.module';
import { SjLoggerModule } from './logger/logger.module';
import { SjCoreConfig } from './models/core';
import { SJ_REST_CONFIG, SjRestModule } from './rest/rest.module';
import { SjRouteMoule } from './route/route.module';
import { SJ_ROUTE_CONFIG } from './route/route.token';
import { SjSessionModule } from './session/session.module';
import { SjStoreModule } from './store/store.module';

@NgModule({
  imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    SjExceptionModule,
    SjSessionModule,
    SjLoggerModule,
    SjAuthModule.forRoot(),
    SjRestModule.forRoot(),
    SjRouteMoule.forRoot(),
    SjStoreModule
  ],
  exports: [SjExceptionModule, SjSessionModule, SjLoggerModule, SjAuthModule, SjRestModule, SjRouteMoule, SjStoreModule]
})
export class SjCoreModule {
  static forRoot(config: SjCoreConfig = {}): ModuleWithProviders {
    const providers: any[] = [];

    if (config.auth) {
      providers.push({
        provide: SJ_AUTH_CONFIG,
        useValue: config.auth
      });
    }

    if (config.route) {
      providers.push({
        provide: SJ_ROUTE_CONFIG,
        useValue: config.route
      });
    }

    if (config.rest) {
      providers.push({
        provide: SJ_REST_CONFIG,
        useValue: config.rest
      });
    }
    return {
      ngModule: SjCoreModule,
      providers: providers
    };
  }
}

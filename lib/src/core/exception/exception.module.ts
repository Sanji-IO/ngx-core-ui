import { NgModule, ErrorHandler } from '@angular/core';

import { SjExceptionService } from './exception.service';

@NgModule({
  providers: [
    {
      provide: ErrorHandler,
      useClass: SjExceptionService
    }
  ]
})
export class SjExceptionModule {}

import { NgModule } from '@angular/core';

import { SjCoreSharedModule } from '../shared/core-shared.module';
import { SjLoggerService } from './logger.service';

@NgModule({
  imports: [SjCoreSharedModule],
  providers: [SjLoggerService]
})
export class SjLoggerModule {}

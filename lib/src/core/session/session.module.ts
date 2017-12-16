import { NgModule } from '@angular/core';

import { SjCoreSharedModule } from '../shared/core-shared.module';
import { SjSessionService } from './session.service';

@NgModule({
  imports: [SjCoreSharedModule],
  providers: [SjSessionService]
})
export class SjSessionModule {}

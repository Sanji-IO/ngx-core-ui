import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SjCoreModule } from '@sanji-io/ngx-core-ui';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SjCoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

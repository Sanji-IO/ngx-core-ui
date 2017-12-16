import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule } from '@angular/material';

@NgModule({
  exports: [CommonModule, FlexLayoutModule, MdButtonModule, MdInputModule, ReactiveFormsModule]
})
export class SharedModule {}

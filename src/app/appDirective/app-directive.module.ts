import { ActiveNavDirective } from './active-nav.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberInputDirective } from './number-input.directive';



@NgModule({
  declarations: [
    ActiveNavDirective,
    NumberInputDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ActiveNavDirective
  ]
})
export class AppDirectiveModule { }

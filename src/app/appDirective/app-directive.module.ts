import { ActiveNavDirective } from './active-nav.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ActiveNavDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ActiveNavDirective
  ]
})
export class AppDirectiveModule { }

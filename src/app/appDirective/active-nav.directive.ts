import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appActiveNav]'
})
export class ActiveNavDirective {

  constructor() { }

  @HostBinding('class.active') className;
  // @HostListener('focusout', ['$event.target']) focusOut() {
  //   this.className = false;
  // }

  @HostListener('click', ['$event.target']) clicked() {
    this.className = !this.className;
  }

  // @HostListener('click') myClick() {
  //   alert('nav clicked');
  // }

}

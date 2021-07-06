import { distinctUntilChanged } from 'rxjs/operators';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective } ]
})
export class MemberProfileComponent implements OnInit {
  label: string = 'Member Profile';
  public profileFormGroup;

  constructor(
    public controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    console.log(this.controlContainer.control.get('addressGroup'));
    this.profileFormGroup = this.controlContainer.control.get('addressGroup') as FormGroup;
  }

  // get form() {
  //   return this.ogFormGroup.controls;
  // }

}

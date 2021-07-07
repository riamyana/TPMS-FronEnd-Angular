import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-proof',
  templateUrl: './member-proof.component.html',
  styleUrls: ['./member-proof.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective } ]
})
export class MemberProofComponent implements OnInit {
  public proofFormGroup: FormGroup;

  constructor(
    public controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.proofFormGroup = this.controlContainer.control.get('proofGroup') as FormGroup;
  }

}

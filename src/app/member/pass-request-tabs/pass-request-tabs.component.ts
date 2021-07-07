import { FormGroup, ControlContainer, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pass-request-tabs',
  templateUrl: './pass-request-tabs.component.html',
  styleUrls: ['./pass-request-tabs.component.scss']
})
export class PassRequestTabsComponent implements OnInit {

  public sampleForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.sampleForm = this.fb.group({
      profile: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        Gender: ['', Validators.required],
        DOB: ['', Validators.required],
        mobileNo: ['', Validators.required],
      }),
      addressGroup: this.fb.group({
        permanentAddress1: ['', Validators.required],
        permanentAddress2: [''],
        permanentCity: ['', Validators.required],
        permanentZip: ['', [Validators.required, Validators.maxLength(10)]],
        sameInd: [''],
        postalAddress1: ['', Validators.required],
        postalAddress2: [''],
        postalCity: ['', Validators.required],
        postalZip: ['', [Validators.required, Validators.maxLength(10)]]
      }),
      proofGroup: this.fb.group({
        requestAs: ['', Validators.required]
      })
    });
  }

  hello() {
    alert("hello");
  }

}

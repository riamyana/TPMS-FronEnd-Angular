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
      user_name: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      addressGroup: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      })
    });
  }

}

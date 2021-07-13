import { cities } from './../../constants/city';
import { distinctUntilChanged } from 'rxjs/operators';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-address',
  templateUrl: './member-address.component.html',
  styleUrls: ['./member-address.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class MemberAddressComponent implements OnInit, OnDestroy {
  public addressFormGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  public cities = cities;

  constructor(
    public controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.addressFormGroup = this.controlContainer.control.get('addressGroup') as FormGroup;
    this.applySubscription();
  }

  applySubscription() {
    this.subscriptions.push(
      this.form.sameInd.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
        this.setPostalAddress();
      })
    );
  }

  get form() {
    return this.addressFormGroup.controls;
  }

  setPostalAddress() {

    if (this.form.sameInd.value) {
      this.form.postalAddress1.setValue(this.form.permanentAddress1.value);
      this.form.postalAddress2.setValue(this.form.permanentAddress2.value);
      this.form.postalCity.setValue(this.form.permanentCity.value);
      this.form.postalZip.setValue(this.form.permanentZip.value);
    } else {
      this.form.postalAddress1.setValue('');
      this.form.postalAddress2.setValue('');
      this.form.postalCity.setValue('');
      this.form.postalZip.setValue('');
    }
  }

  ngOnDestroy() {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

}

import { LoaderService } from './../../_services/loader/loader.service';
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
  public profileFormGroup: FormGroup;
  url;

  constructor(
    public controlContainer: ControlContainer,
    public loader: LoaderService
  ) { }

  ngOnInit(): void {
    console.log(this.controlContainer.control.get('profile'));
    this.profileFormGroup = this.controlContainer.control.get('profile') as FormGroup;
  }

  get form() {
    return this.profileFormGroup.controls;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

}

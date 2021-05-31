import { TransportModeService } from './../../../_services/transport-mode/transport-mode.service';
import { FormErrorStateMatcher } from './../../../ErrorStateMatcher/FormErrorStateMatcher';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-transport-mode',
  templateUrl: './add-transport-mode.component.html',
  styleUrls: ['./add-transport-mode.component.scss']
})
export class AddTransportModeComponent implements OnInit {
  transportTypeForm: FormGroup;
  matcher = new FormErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<AddTransportModeComponent>,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private transportModeService: TransportModeService
  ) { }

  ngOnInit(): void {
    this.transportTypeForm = this.formBuilder.group({
      modeType: ['', Validators.required]
    });
  }

  get form() {
    return this.transportTypeForm.controls;
  }

  onAdd() {
    this.transportModeService.addModeType(this.form.modeType.value).subscribe(
      data => {
        this.dialogRef.close(data);
        this.notifierService.showNotification('Transport Mode Type Added Successfully', 'OK', 'success');
      },
      err => {
        this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
        console.log(err);
        this.dialogRef.close();
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }

}

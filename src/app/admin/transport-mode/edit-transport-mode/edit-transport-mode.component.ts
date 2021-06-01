import { TransportModeService } from './../../../_services/transport-mode/transport-mode.service';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { AddTransportModeComponent } from './../add-transport-mode/add-transport-mode.component';
import { FormErrorStateMatcher } from './../../../ErrorStateMatcher/FormErrorStateMatcher';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransportMode } from 'src/app/_models/transport-mode/transport-mode';

@Component({
  selector: 'app-edit-transport-mode',
  templateUrl: './edit-transport-mode.component.html',
  styleUrls: ['./edit-transport-mode.component.scss']
})
export class EditTransportModeComponent implements OnInit {
  transportTypeForm: FormGroup;
  matcher = new FormErrorStateMatcher();
  transportData: TransportMode;

  constructor(
    public dialogRef: MatDialogRef<AddTransportModeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransportMode,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private transportModeService: TransportModeService
  ) { 
    this.transportData = this.data;
  }

  ngOnInit(): void {
    this.transportTypeForm = this.formBuilder.group({
      modeType: [this.data.name, Validators.required]
    });
  }

  get form() {
    return this.transportTypeForm.controls;
  }

  onUpdate() {
    this.transportData.name = this.form.modeType.value;
    this.transportModeService.updateModeType(this.transportData).subscribe(
      data => {
        console.log(data);
        this.notifierService.showNotification('Transport Mode Type Updated Successfully', 'OK', 'success');
        this.dialogRef.close(true);
      },
      err => {
        this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
        console.log(err);
        this.dialogRef.close(false);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }

}

import { NotifierMsg } from './../../../constants/notifierMsg';
import { Router } from '@angular/router';
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
    private transportModeService: TransportModeService,
    private router: Router
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
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else if ((err.error.message).includes('requires a unique value')) {
          this.notifierService.showNotification('This mode already exists..!', 'OK', 'error');
        } else {
            this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
        console.log(err);
        this.dialogRef.close();
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }

}

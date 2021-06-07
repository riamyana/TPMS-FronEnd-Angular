import { TransportCostService } from './../../../_services/transport-cost/transport-cost.service';
import { Station } from './../../../_models/station/station';
import { StationService } from './../../../_services/station/station.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoaderService } from './../../../_services/loader/loader.service';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { TransportCostDetails } from 'src/app/_models/transport-cost/transport-cost-details';
import { TransportCost } from 'src/app/_models/transport-cost/transport-cost';
import { NotifierMsg } from 'src/app/constants/notifierMsg';

@Component({
  selector: 'app-add-update-transport-cost',
  templateUrl: './add-update-transport-cost.component.html',
  styleUrls: ['./add-update-transport-cost.component.scss']
})
export class AddUpdateTransportCostComponent implements OnInit {
  msg: string = "Add";
  transportCostForm: FormGroup;
  stationData: Station[];
  transportCost: TransportCost;

  constructor(
    private stationService: StationService,
    private transportCostService: TransportCostService,
    private formBuilder: FormBuilder,
    public loader: LoaderService,
    private notifierService: NotifierService,
    private router: Router,
    private dialogRef: MatDialogRef<AddUpdateTransportCostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransportCostDetails
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.stationService.stationObservable.subscribe(data => {
      this.stationData = data;
    });

    if (this.data) {
      this.msg = "Update";
      this.setValue();
    }
  }

  initForm() {
    this.transportCostForm = this.formBuilder.group({
      transcostId: [''],
      fromStationId: ['', Validators.required],
      toStationId: ['', Validators.required],
      cost: ['', Validators.required]
    });
  }


  get form() {
    return this.transportCostForm.controls;
  }
  setValue() {
    let from = this.stationData.find((data) => {
      if (data.stationName === this.data.fromStationName) {
        return data.stationId;
      }
      return null;
    });

    let to = this.stationData.find((data) => {
      if (data.stationName === this.data.toStationName) {
        return data.stationId;
      }
      return null;
    });

    this.form.fromStationId.setValue(from.stationId);
    this.form.toStationId.setValue(to.stationId);
    this.form.cost.setValue(this.data.cost);
  }

  onAdd() {
    this.getValue();

    this.transportCostService.addTransportCost(this.transportCost).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close(data);
        this.notifierService.showNotification(NotifierMsg.SuccessAddMsg('Transport Cost'), 'OK', 'success');
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });

      this.dialogRef.close();
  }

  getValue() {
    this.transportCost = {
      transCostId: this.data?this.data.id:0,
      fromStationId: this.form.fromStationId.value,
      toStationId: this.form.toStationId.value,
      cost: this.form.cost.value
    };
  }

  onUpdate() {
    this.getValue(); 

    this.transportCostService.updateTransportCost(this.transportCost).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close(data);
        this.notifierService.showNotification(NotifierMsg.SuccessUpdateMsg('Transport Cost'), 'OK', 'success');
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });

      this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

}

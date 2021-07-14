import { BehaviorSubject } from 'rxjs';
import { PassRequestService } from './../../_services/pass-request/pass-request.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PassByMember } from 'src/app/_models/passByMemberId';
import * as moment from 'moment';

@Component({
  selector: 'app-view-pass',
  templateUrl: './view-pass.component.html',
  styleUrls: ['./view-pass.component.scss']
})
export class ViewPassComponent implements OnInit {

  passData: PassByMember = { memberId: 0, serialNo: 0, expiry: '', firstName: '', lastName: 'kdf'};
  qrData: string = "dkfj";
  elementType: 'url' | 'canvas' | 'img' = 'url';
  date: string;
  serialNo: string[];
  month:string;
  year: string;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PassByMember
  ) { }

  ngOnInit(): void {
    this.serialNo = this.data.serialNo.toString().match(/.{1,3}/g);
    console.log(this.serialNo);
    this.date = moment(this.data.expiry).format('MM/YYYY').toString();
    this.month = moment(this.data.expiry).format('MM').toString();
    this.year = moment(this.data.expiry).format('YYYY').toString();
    this.qrData = `
      Serial No.: ${this.data.serialNo}
      Name: ${this.data.firstName} ${this.data.lastName}
      Expiry Date: ${this.date}
    `;
  }

}

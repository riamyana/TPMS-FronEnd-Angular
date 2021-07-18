import { PackageForMember } from './../../_models/packageForMember';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ICustomWindow extends Window {
  __custom_global_stuff: string;
}

function getWindow(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  package: PackageForMember;

  constructor(private http: HttpClient) { }

  createOrder(data: any): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environment.serverUrl}create-order`, data, { headers: httpHeaders });
  }

  get nativeWindow(): ICustomWindow {
    return getWindow();
  }
}

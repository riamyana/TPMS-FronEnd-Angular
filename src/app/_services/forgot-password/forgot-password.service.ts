import { ForgtoPassword } from './../../_models/forgot-password';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  sendOTP(userName: string): Observable<string> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${environment.serverUrl}forgot-password/send-email`, userName, { headers: httpHeaders });
  }

  validateOTP(data: ForgtoPassword): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${environment.serverUrl}forgot-password/validate-otp/${data.userName}`, data, { headers: httpHeaders });
  }

  changePassword(data: ForgtoPassword): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${environment.serverUrl}forgot-password/change-password`, data, { headers: httpHeaders });
  }
}

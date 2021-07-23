import { ForgtoPassword } from './../../_models/forgot-password';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  otp;
  userName;
  role;

  constructor(private http: HttpClient) { }

  sendOTP(userName: string): Observable<string> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${environment.serverUrl}forgot-password/send-email`, this.userName, { headers: httpHeaders });
  }

  validateOTP(): Observable<any> {
    const data: ForgtoPassword = {
      userName: this.userName,
      otp: this.otp
    }
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${environment.serverUrl}forgot-password/validate-otp`, data, { headers: httpHeaders });
  }

  changePassword(password: string): Observable<any> {
    const data: ForgtoPassword = {
      userName: this.userName,
      otp: this.otp,
      newPassword: password
    };

    console.log("const data");
    console.log(data);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${environment.serverUrl}forgot-password/change-password`, data, { headers: httpHeaders });
  }
}

import { StatusCategory } from './../../_models/statusCategoryEnum';
import { environment } from './../../../environments/environment';
import { MemberProfile } from './../../_models/memberProfile';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberProfileService {

  constructor(private http: HttpClient) { }

  getMemberByUserId(userId: number): Observable<MemberProfile[]> {
    return this.http.get<MemberProfile[]>(`${environment.serverUrl}member/${userId}`);
  }

  getCountStatus(status: number): Observable<number> {
    return this.http.get<number>(`${environment.serverUrl}members/pass-request/count/status/${status}`);
  }
  
  packageData(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}last-year-package`);
  }

  modePackageData(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}last-year-transport-package`);
  }
}

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
}

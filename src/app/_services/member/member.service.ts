import { MemberType } from './../../_models/member/member-type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getMemberType() {
    return this.http.get<any>(`${environment.severUrl}member-types`);
  }
}

import { map } from 'rxjs/operators';
import { MemberType } from './../../_models/member/member-type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getMemberType() {
    return this.http.get<any>(`${environment.severUrl}member-types`);
  }

  addMemberType(memberTypeName: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environment.severUrl}member-types`, { memberTypeName }, { headers: httpHeaders });
  }
}

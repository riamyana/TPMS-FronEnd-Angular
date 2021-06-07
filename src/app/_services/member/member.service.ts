import { MemberType } from './../../_models/member/member-type';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getMemberType(): Observable<MemberType[]> {
    return this.http.get<MemberType[]>(`${environment.serverUrl}member-types`);
  }

  addMemberType(memberTypeName: string): Observable<MemberType> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<MemberType>(`${environment.serverUrl}member-types`, { memberTypeName }, { headers: httpHeaders });
  }

  deleteMemberType(id: number): Observable<any> {
    return this.http.delete(`${environment.serverUrl}member-types/${id}`);
  }

  updateMemberType(memberType: MemberType)  {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<MemberType>(`${environment.serverUrl}member-types/${memberType.memberTypeId}`, memberType, { headers: httpHeaders });
  }
}

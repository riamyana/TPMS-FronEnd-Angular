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

  getMemberType() {
    return this.http.get<any>(`${environment.severUrl}member-types`);
  }

  addMemberType(memberTypeName: string): Observable<MemberType> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environment.severUrl}member-types`, { memberTypeName }, { headers: httpHeaders });
  }

  deleteMemberType(id: number): Observable<any> {
    return this.http.delete(`${environment.severUrl}member-types/${id}`);
  }

  updateMemberType(memberType: MemberType)  {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log("dataservice");
    console.log(memberType);

    return this.http.put<MemberType>(`${environment.severUrl}member-types/${memberType.memberTypeId}`, memberType, { headers: httpHeaders });
  }
}

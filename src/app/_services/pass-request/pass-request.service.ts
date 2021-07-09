import { MemberProof } from './../../_models/memberProof';
import { FormArray } from '@angular/forms';
import { concatMap, switchMap } from 'rxjs/operators';
import { Address } from './../../_models/address';
import { MemberProfile } from './../../_models/memberProfile';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassRequestService {
  memberProof: MemberProof;

  constructor(private http: HttpClient) { }

  addMemberProfile(memberProfile: MemberProfile): Observable<MemberProfile> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<MemberProfile>(`${environment.serverUrl}members`, memberProfile, { headers: httpHeaders });
  }

  addAddress(memberAddress: Address): Observable<MemberProfile> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<MemberProfile>(`${environment.serverUrl}member/member-address`, memberAddress, { headers: httpHeaders });
  }

  passRequest(memberProfile: MemberProfile, memberAddress: Address, proof: FormArray): Observable<MemberProof> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    memberProfile.status = false;

    // return this.http.post<MemberProfile>(`${environment.serverUrl}members`, memberProfile, { headers: httpHeaders });

    return this.http.post<MemberProfile>(`${environment.serverUrl}members`, memberProfile, { headers: httpHeaders })
      .pipe(
        concatMap((res: MemberProfile) => {
          memberAddress.memberId = res.memberId;
          return this.http.post<Address>(`${environment.serverUrl}member/member-address`, memberAddress, { headers: httpHeaders })
        }),
        switchMap((res: Address) => {
          const len = proof.length;

          for (let i = 0; i < len; i++) {
            this.updateProof(i, proof, res.memberId);
      
            if (i == len - 1) {
              return this.http.post<MemberProof>(`${environment.serverUrl}member-proofs`, this.memberProof, { headers: httpHeaders });
            } 
            else {
              this.http.post<MemberProof>(`${environment.serverUrl}member-proofs`, this.memberProof, { headers: httpHeaders }).subscribe(
                data => {
                  console.log(data);
                },
                err => {
                  console.log(err);
                }
              );
            }
          }
          return null;
        })
      );
  }

  updateProof(i: number, proof: FormArray, memberId: number) {
    this.memberProof = {
      proofId: proof.controls[i].get('proofId').value,
      memberId: memberId,
      uidNo: proof.controls[i].get('proofNo').value,
      proofImage: proof.controls[i].get('proofName').value
    }
  }

  getMemberPassRequest(): Observable<MemberProfile[]> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<MemberProfile[]>(`${environment.serverUrl}members/pass-request`, { headers: httpHeaders });
  }

  changePassRequestStatus(memberId: number, status: boolean): Observable<number> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<number>(`${environment.serverUrl}members/pass-request/status/${memberId}/${status}`, { headers: httpHeaders });
  }
}

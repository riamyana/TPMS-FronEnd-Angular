import { StatusCategory } from './../../_models/statusCategoryEnum';
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
  file: File[] = [];

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
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    memberProfile.status = StatusCategory.DEFAULT;

    return this.http.post<MemberProfile>(`${environment.serverUrl}members`, memberProfile, { headers: httpHeaders })
      .pipe(
        concatMap((res: MemberProfile) => {
          memberAddress.memberId = res.memberId;
          return this.http.post<Address>(`${environment.serverUrl}member/member-address`, memberAddress, { headers: httpHeaders })
        }),
        concatMap((res: Address) => {
          const len = proof.length;

          for (let i = 0; i < len; i++) {
            this.updateProof(i, proof, res.memberId);
            const formData = new FormData();
            formData.append("proofImage", this.getFile(i));
            formData.append("proofId", this.memberProof.proofId.toString());
            formData.append("memberId", this.memberProof.memberId.toString());
            formData.append("uidNo", this.memberProof.uidNo.toString());

            if (i == len - 1) {
              return this.http.post<MemberProof>(`${environment.serverUrl}member-proofs`, formData);
            }
            else {
              this.http.post<MemberProof>(`${environment.serverUrl}member-proofs`, formData).subscribe(
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
        }),
        concatMap((res: any) => {
          return this.http.post<any>(`${environment.serverUrl}pass-request-email`, memberProfile.userName, { headers: httpHeaders })
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

  changePassRequestStatus(memberId: number, status: StatusCategory, description: string): Observable<number> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<number>(`${environment.serverUrl}members/pass-request/status/${memberId}/${status}`, description, { headers: httpHeaders });
  }

  addFiles(file: File, i: number, length: number) {
    this.file.splice(i, this.file.length == length ? 1 : 0, file);
  }

  getFiles(): File[] {
    return this.file;
  }

  getFile(i: number): File {
    return this.file[i];
  }

  clearFiles() {
    this.file.length = 0;
  }

  // demoProof(): Observable<string> {
  //   const formData = new FormData();
  //   formData.append("proofImage", this.getFile(0));
  //   formData.append("proofId", "2");
  //   formData.append("memberId", "11");
  //   formData.append("uidNo", "1");

  //   return this.http.post<string>(`${environment.serverUrl}member-proofs/demo`, formData);
  // }

  getProofs(memberId: number): Observable<MemberProof[]> {
    return this.http.get<MemberProof[]>(`${environment.serverUrl}member/${memberId}/member-proofs`);
  }
}

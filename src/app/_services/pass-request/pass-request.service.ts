import { Proof } from './../../_models/Proof/proof';
import { PassByMember } from './../../_models/passByMemberId';
import { StatusCategory } from './../../_models/statusCategoryEnum';
import { MemberProof } from './../../_models/memberProof';
import { FormArray, FormGroup } from '@angular/forms';
import { concatMap, switchMap } from 'rxjs/operators';
import { Address } from './../../_models/address';
import { MemberProfile } from './../../_models/memberProfile';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

export interface ProofsValue {
  memberTypeId: number,
  status: number,
  memberId: number
}
@Injectable({
  providedIn: 'root'
})
export class PassRequestService {
  memberProof: MemberProof;
  file: File[] = [];
  childMemberProof: ProofsValue;
  proofData: Proof[] = [];

  constructor(private http: HttpClient) { }

  addMemberProfile(memberProfile: MemberProfile): Observable<MemberProfile> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<MemberProfile>(`${environment.serverUrl}members`, memberProfile, { headers: httpHeaders });
  }

  getMemberProfile(memberId: number): Observable<MemberProfile> {
    return this.http.get<MemberProfile>(`${environment.serverUrl}members/${memberId}`);
  }

  addAddress(memberAddress: Address): Observable<MemberProfile> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<MemberProfile>(`${environment.serverUrl}member/member-address`, memberAddress, { headers: httpHeaders });
  }

  getAddress(memberId: number): Observable<Address> {
    return this.http.get<Address>(`${environment.serverUrl}member/member-address/${memberId}`);
  }

  // getProof(memberId: number) {
  //   return this.http.get<Address>(`${environment.serverUrl}member/member-address/${memberId}"`); 
  // }

  addPass(memberProfile: MemberProfile, passForm: FormGroup): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const data = {
      memberId: memberProfile.memberId,
      serialNo: 412400000000 + +passForm.get('serialNo').value,
      expiry: passForm.get('expiry').value
    }
    return this.http.post<MemberProfile>(`${environment.serverUrl}passes`, data, { headers: httpHeaders });
  }

  passRequest(memberProfile: MemberProfile, memberAddress: Address, proof: FormArray): Observable<MemberProof> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

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

  updatePassRequest(memberProfile: MemberProfile, memberAddress: Address, proof: FormArray): Observable<MemberProof> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<MemberProfile>(`${environment.serverUrl}members`, memberProfile, { headers: httpHeaders })
      .pipe(
        concatMap((res: MemberProfile) => {
          const memberId = res.memberId;
          const addressId = memberAddress.addressId;
          return this.http.put<Address>(`${environment.serverUrl}member/${memberId}/member-address/${addressId}`, memberAddress, { headers: httpHeaders })
        }),
        concatMap((res: Address) => {
          const len = proof.length;

          for (let i = 0; i < len; i++) {
            this.updateProof(i, proof, res.memberId);
            const formData = new FormData();
            formData.append("proofImage", this.getFile(i));
            formData.append("memProofId", this.memberProof.memProofId.toString());
            formData.append("proofId", this.memberProof.proofId.toString());
            formData.append("memberId", this.memberProof.memberId.toString());

            if (i == len - 1) {
              return this.http.put<MemberProof>(`${environment.serverUrl}member-proofs`, formData);
            }
            else {
              this.http.put<MemberProof>(`${environment.serverUrl}member-proofs`, formData).subscribe(
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
      memProofId: this.proofData[i] ? this.proofData[i].memProofId : 0,
      proofId: proof.controls[i].get('proofId').value,
      memberId: memberId,
      proofImage: proof.controls[i].get('proofName').value
    }
  }

  getMemberPassRequest(): Observable<MemberProfile[]> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<MemberProfile[]>(`${environment.serverUrl}members/pass-request`, { headers: httpHeaders });
  }

  getMemberProof(): Observable<MemberProof[]> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<MemberProof[]>(`${environment.serverUrl}member/${this.childMemberProof.memberId}/member-proofs`);
  }

  changePassRequestStatus(memberProfile: MemberProfile): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<number>(`${environment.serverUrl}members/pass-request/status/${memberProfile.memberId}/${memberProfile.status}`, memberProfile, { headers: httpHeaders })
      .pipe(
        switchMap(() => {
          const data = {
            userName: memberProfile.userName,
            status: memberProfile.status,
            description: memberProfile.description
          }

          return this.http.post<any>(`${environment.serverUrl}pass-status-email`, data, { headers: httpHeaders });
        })
      );
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

  getProofs(memberId: number): Observable<MemberProof[]> {
    return this.http.get<MemberProof[]>(`${environment.serverUrl}member/${memberId}/member-proofs`);
  }

  sendStatusEmail(memberProfile: MemberProfile): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}pass-status-email`);
  }

  getPassByMemberId(memberId: number): Observable<PassByMember> {
    return this.http.get<PassByMember>(`${environment.serverUrl}passes/member/${memberId}`);
  }

  getMemberProofByMemberId(id: number): Observable<Proof[]> {
    return this.http.get<Proof[]>(`${environment.serverUrl}member/${id}/member-proofs`);
  }
}

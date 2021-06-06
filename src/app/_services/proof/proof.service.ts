import { Proof } from './../../_models/Proof/proof';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProofService {

  constructor(private http: HttpClient) { }

  getProof() {
    return this.http.get<Proof[]>(`${environment.severUrl}proofs`);
  }

  getProofByMemberId(id: number) {
    return this.http.get<Proof>(`${environment.severUrl}proofs/member-types/${id}`);
  }

  deleteMemberType(id: number): Observable<any> {
    return this.http.delete(`${environment.severUrl}proofs/${id}`);
  }

  addProof(proof: Proof): Observable<Proof> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(proof);
    return this.http.post<Proof>(`${environment.severUrl}proofs`, proof, { headers: httpHeaders });
  }

  getProof2() {
    return this.http.get<Proof[]>(`${environment.severUrl}proofs`);
  }
}

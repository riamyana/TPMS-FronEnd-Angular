import { ProofRequirement } from './../../_models/proofRequirement';
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
    return this.http.get<Proof[]>(`${environment.serverUrl}proofs`);
  }

  getProofByMemberId(id: number) {
    return this.http.get<Proof>(`${environment.serverUrl}proofs/member-types/${id}`);
  }

  deleteProof(id: number): Observable<any> {
    return this.http.delete(`${environment.serverUrl}proofs/${id}`);
  }

  addProof(proofName: string): Observable<Proof> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Proof>(`${environment.serverUrl}proofs`, { proofName }, { headers: httpHeaders });
  }

  updateProof(proofData: Proof): Observable<Proof> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<Proof>(`${environment.serverUrl}proofs/${proofData.proofId}`, proofData, { headers: httpHeaders });
  }

  getProofRequirement() {
    return this.http.get<ProofRequirement[]>(`${environment.serverUrl}proofs/requirement`);
  }

  addProofRequirement(proofRequirement: ProofRequirement): Observable<ProofRequirement> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Proof>(`${environment.serverUrl}proofs/requirement`, proofRequirement, { headers: httpHeaders });
  }

  updateProofRequirement(proofData: ProofRequirement): Observable<ProofRequirement> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<ProofRequirement>(`${environment.serverUrl}proofs/requirement/${proofData.id}`, proofData, { headers: httpHeaders });
  }

  deleteProofRequirement(id: number): Observable<any> {
    return this.http.delete(`${environment.serverUrl}proofs/requirement/${id}`);
  }
}

import { Observable } from 'rxjs';
import { Pass } from './../../_models/pass';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassService {

  constructor(private http: HttpClient) { }

  getPassByUserId(userId: number): Observable<Pass[]> {
    return this.http.get<Pass[]>(`${environment.serverUrl}passes/userId/${userId}`);
  }
}

import { EnrolledPackage } from './../../_models/enrolled-package';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnrolledPackageService {

  constructor(private http: HttpClient) { }

  getEnrolledPackageByPassId(passId: number): Observable<EnrolledPackage[]> {
    return this.http.get<EnrolledPackage[]>(`${environment.serverUrl}enrolled-packages/${passId}`);
  }
}

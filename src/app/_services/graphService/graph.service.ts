import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http: HttpClient) { }

  packageData(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}last-year-package`);
  }

  modePackageData(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}last-year-transport-package`);
  }
}

import { Observable } from 'rxjs';
import { Package } from './../../_models/package/package';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }

  getPackages() {
    return this.http.get<any>(`${environment.severUrl}packages`);
  }

  deletePackage(id: number): Observable<any> {
    return this.http.delete(`${environment.severUrl}packages/${id}`);
  }

  addDiscount() {
    
  }

  addPackage(pck: Package): Observable<Package> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environment.severUrl}packages`, { pck }, { headers: httpHeaders });
  }  
}

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransportMode } from 'src/app/_models/transport-mode/transport-mode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportModeService {

  constructor(private http: HttpClient) { }

  getTransportModes() {
    return this.http.get<any>(`${environment.severUrl}transport-modes`);
  }

  addModeType(name: string): Observable<TransportMode> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<TransportMode>(`${environment.severUrl}transport-modes`, { name }, { headers: httpHeaders });
  }

  deleteMode(id: number): Observable<any> {
    return this.http.delete(`${environment.severUrl}transport-modes/${id}`);
  }

  updateModeType(modeType: TransportMode)  {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<TransportMode>(`${environment.severUrl}transport-modes/${modeType.id}`, modeType, { headers: httpHeaders });
  }
}

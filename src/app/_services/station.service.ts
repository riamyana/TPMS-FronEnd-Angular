import { Station } from './../_models/station/station';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) { }

  addStation(stationData: Station): Observable<Station> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Station>(`${environment.serverUrl}stations`, stationData, { headers: httpHeaders });
  }

  getStation(): Observable<Station[]> {
    return this.http.get<Station[]>(`${environment.serverUrl}stations`);
  }

  deleteStation(id: number): Observable<any> {
    return this.http.delete(`${environment.serverUrl}stations/${id}`);
  }

  updateStation(stationData: Station): Observable<Station> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<Station>(`${environment.serverUrl}stations/${stationData.stationId}`, stationData, { headers: httpHeaders });
  }
}

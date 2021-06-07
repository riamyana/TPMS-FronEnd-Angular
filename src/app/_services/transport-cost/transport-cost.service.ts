import { TransportCostDetails } from './../../_models/transport-cost/transport-cost-details';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TransportCost } from 'src/app/_models/transport-cost/transport-cost';

@Injectable({
  providedIn: 'root'
})
export class TransportCostService {

  constructor(private http: HttpClient) { }

  getTransportCost(): Observable<TransportCostDetails[]> {
    return this.http.get<TransportCostDetails[]>(`${environment.serverUrl}transports-cost`);
  }

  deleteTransportCost(id: number): Observable<any> {
    return this.http.delete(`${environment.serverUrl}transports-cost/${id}`);
  }

  updateTransportCost(costData: TransportCost): Observable<TransportCost> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<TransportCost>(`${environment.serverUrl}transports-cost/${costData.transCostId}`, costData, { headers: httpHeaders });
  }

  addTransportCost(costData: TransportCost): Observable<TransportCost> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<TransportCost>(`${environment.serverUrl}transports-cost`, costData, { headers: httpHeaders });
  }
}

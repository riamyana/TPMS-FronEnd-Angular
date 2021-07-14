import { switchMap } from 'rxjs/operators';
import { MemberProfile } from './../../_models/memberProfile';
import { ProfileData } from './../../_models/profile/profileData';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  currentUserSubject: BehaviorSubject<MemberProfile>;
  currentUser: Observable<MemberProfile>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<MemberProfile>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getUserProfile(id: number): Observable<MemberProfile[]> {
    return this.http.get<MemberProfile[]>(`${environment.serverUrl}member/${id}`);
  }

  updateProfile(memberProfile: ProfileData): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const data = {
      memberTypeId: memberProfile.memberTypeId,
      firstName: memberProfile.firstName,
      lastName: memberProfile.lastName,
      gender: memberProfile.gender,
      dob: memberProfile.dob,
      mobileNo: memberProfile.mobileNo,
    };

    return this.http.post<any>(`${environment.serverUrl}members/${memberProfile.memberId}`, data, { headers: httpHeaders })
      .pipe(
        switchMap(() => {
          const data = {
            // userName: memberProfile.userName,
            // status: memberProfile.status,
            // description: memberProfile.description
          }

          return this.http.post<any>(`${environment.serverUrl}pass-status-email`, data, { headers: httpHeaders });
        })
      );
  }
}

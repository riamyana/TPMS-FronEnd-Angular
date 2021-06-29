import { ProfileData } from './../../_models/profile/profileData';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  currentUserSubject: BehaviorSubject<ProfileData>;
  currentUser: Observable<ProfileData>;
  profileData = {
    memberId: 1,
    memberTypeId: 1,
    memberTypeName: "",
    firstName: "string",
    lastName: "",
    mobileNo: "",
    dob: "",
  };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<ProfileData>(this.profileData);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getUserProfile(id: number): Observable<ProfileData[]> {
    return this.http.get<ProfileData[]>(`${environment.serverUrl}members/user/${id}`);
  }
}

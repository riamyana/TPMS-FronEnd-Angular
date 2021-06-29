import { ChangePassword } from './../_models/profile/changePassword';
import { LoginModel } from './../_models/loginModel';
import { UserModel } from './../_models/userModel';
import { Roles } from './../constants/roles';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // public isAuthenticated = new BehaviorSubject<boolean>(false);
  // public isMenuOpen = new BehaviorSubject<boolean>(false);
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  login(userName: string, password: string, role: Roles) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environment.serverUrl}authenticate`, { userName, password }, { headers: httpHeaders })
      .pipe(map(result => {
        if (result && result.jwtToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(result));
          this.currentUserSubject.next(result);
        }

        return result;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn():boolean {
    return !!(localStorage.getItem('currentUser'));
  }

  getRole(): UserModel {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  changePassword(data: ChangePassword): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log(data);
    return this.http.post<any>(`${environment.serverUrl}user/changePassword`, data, { headers: httpHeaders });
  }
}

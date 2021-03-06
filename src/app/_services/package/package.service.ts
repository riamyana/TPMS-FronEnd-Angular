import { PackageForMember } from './../../_models/packageForMember';
import { MemberPackage } from './../../_models/package/member-package';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Package, MemberTypePackageData } from './../../_models/package/package';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';
import { FormArray } from '@angular/forms';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  memberPackage: MemberPackage;
  memberTypePackageSubject: ReplaySubject<MemberTypePackageData>;
  memberTypePackageObservable: Observable<MemberTypePackageData>;
  memberTypePackageData: MemberTypePackageData = {
    memberTypePackages: []
  };

  constructor(private http: HttpClient) {
    this.memberTypePackageSubject = new ReplaySubject<MemberTypePackageData>(1);
    this.memberTypePackageObservable = this.memberTypePackageSubject.asObservable();
  }

  getPackages() {
    return this.http.get<Package[]>(`${environment.serverUrl}packages`);
  }

  getMemberTypePackages(packageId: number) {
    return this.http.get<MemberTypePackageData[]>(`${environment.serverUrl}member-packages/${packageId}`);
  }

  getPackagesForMemberType(memberTypeId: number): Observable<PackageForMember[]> {
    return this.http.get<PackageForMember[]>(`${environment.serverUrl}member-packages/memberId/${memberTypeId}`);
  }

  getPackagesForMember(): Observable<PackageForMember[]> {
    return this.http.get<PackageForMember[]>(`${environment.serverUrl}member-packages`);
  }

  getModePackages(modeId: number): Observable<Package[]> {
    return this.http.get<Package[]>(`${environment.serverUrl}packages/mode/${modeId}`);
  }

  deletePackage(id: number): Observable<any> {
    return this.http.delete(`${environment.serverUrl}packages/${id}`);
  }

  // addPackage(pck: Package): Observable<Package> {
  //   const httpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.post<Package>(`${environment.severUrl}packages`, pck , { headers: httpHeaders });
  // }  

  addMemberPackage(memberPackage: MemberPackage): Observable<MemberPackage> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<MemberPackage>(`${environment.serverUrl}member-packages`, memberPackage, { headers: httpHeaders });
  }

  addPackage(pck: Package, member: FormArray): Observable<MemberPackage> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Package>(`${environment.serverUrl}packages`, pck, { headers: httpHeaders })
      .pipe(switchMap((res: Package) => {
        const len = member.length;

        for (let i = 0; i < len; i++) {
          this.updateMemberPackage(i, member, res.id);

          if (i == len - 1) {
            return this.http.post<MemberPackage>(`${environment.serverUrl}member-packages`, this.memberPackage, { headers: httpHeaders });
          } else {
            // return this.http.post<MemberPackage>(`${environment.serverUrl}member-packages`, this.memberPackage, { headers: httpHeaders });
            this.http.post<MemberPackage>(`${environment.serverUrl}member-packages`, this.memberPackage, { headers: httpHeaders }).subscribe(
              data => {
                console.log(data);
              },
              err => {
                console.log(err);
              }
            );
          }
        }
        return null;
      }))
  }

  updateMemberPackage(i: number, member: FormArray, id: number) {
    const validStartDate = moment(member.controls[i].get('startDate').value).format("YYYY-MM-DD");
    const validEndDate = moment(member.controls[i].get('endDate').value).format("YYYY-MM-DD");
    this.memberPackage = {
      id: member.controls[i].get('id').value,
      packageId: id,
      memberTypeId: member.controls[i].get('memberTypeName').value,
      discountStartDate: validStartDate == 'Invalid date' ? '' : validStartDate,
      discountEndDate: validEndDate == 'Invalid date' ? '' : validEndDate,
      discountPercentage: member.controls[i].get('discount').value,
      discountDescription: member.controls[i].get('description').value
    }

    console.log("memberPackage");
    console.log(this.memberPackage);
  }

  set memberTypePackage(data: MemberTypePackageData) {
    this.memberTypePackageSubject.next(data);
  }
}

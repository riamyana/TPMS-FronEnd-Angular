import { TestBed } from '@angular/core/testing';

import { EnrolledPackageService } from './enrolled-package.service';

describe('EnrolledPackageService', () => {
  let service: EnrolledPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrolledPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ViewPackageService } from './view-package.service';

describe('ViewPackageService', () => {
  let service: ViewPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PassRequestService } from './pass-request.service';

describe('PassRequestService', () => {
  let service: PassRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

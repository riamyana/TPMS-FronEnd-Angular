import { TestBed } from '@angular/core/testing';

import { TransportModeService } from './transport-mode.service';

describe('TransportModeService', () => {
  let service: TransportModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

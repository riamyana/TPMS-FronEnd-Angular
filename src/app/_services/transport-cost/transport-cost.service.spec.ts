import { TestBed } from '@angular/core/testing';

import { TransportCostService } from './transport-cost.service';

describe('TransportCostService', () => {
  let service: TransportCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

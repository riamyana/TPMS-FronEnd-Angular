import { TestBed } from '@angular/core/testing';

import { MemberProfileService } from './member-profile.service';

describe('MemberProfileService', () => {
  let service: MemberProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { WithdrawGuard } from './withdraw-guard.service';

describe('WithdrawGuardService', () => {
  let service: WithdrawGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithdrawGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

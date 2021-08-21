import { TestBed } from '@angular/core/testing';

import { UserWithdrawalService } from './use-withdrawal.service';

describe('UseWithdrawalService', () => {
  let service: UserWithdrawalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserWithdrawalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

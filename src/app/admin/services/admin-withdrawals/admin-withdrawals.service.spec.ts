import { TestBed } from '@angular/core/testing';

import { AdminWithdrawalsService } from './admin-withdrawals.service';

describe('AdminWithdrawalsService', () => {
  let service: AdminWithdrawalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminWithdrawalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

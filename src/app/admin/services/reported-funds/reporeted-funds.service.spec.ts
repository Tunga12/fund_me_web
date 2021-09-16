import { TestBed } from '@angular/core/testing';

import { ReportedFundsService } from './reported';

describe('ReporetedFundsService', () => {
  let service: ReportedFundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportedFundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

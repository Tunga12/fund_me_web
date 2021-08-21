import { TestBed } from '@angular/core/testing';

import { AdminDonationsService } from './admin-donations.service';

describe('AdminDonationsService', () => {
  let service: AdminDonationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDonationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

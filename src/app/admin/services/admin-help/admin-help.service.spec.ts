import { TestBed } from '@angular/core/testing';

import { AdminHelpService } from './admin-help.service';

describe('AdminHelpService', () => {
  let service: AdminHelpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminHelpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

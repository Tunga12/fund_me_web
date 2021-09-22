import { TestBed } from '@angular/core/testing';

import { ReportReasonTypesService } from './report-reason-types.service';

describe('ReportReasonTypesService', () => {
  let service: ReportReasonTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportReasonTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

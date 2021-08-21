import { TestBed } from '@angular/core/testing';

import { EditGuard } from './edit-guard.service';

describe('EditGuardService', () => {
  let service: EditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValueMatchesValidatorService } from './value-matches-validator.service';

describe('Service: ValueMatchesValidator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueMatchesValidatorService]
    });
  });

  it('should ...', inject([ValueMatchesValidatorService], (service: ValueMatchesValidatorService) => {
    expect(service).toBeTruthy();
  }));
});

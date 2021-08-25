import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValueMatchesValidatorService {
  constructor() {}

  matchPassword(password?: AbstractControl): ValidatorFn {
    return (confirmPassword: AbstractControl): ValidationErrors | null => {
      if (password?.value !== confirmPassword) {
        return { matches: true };
      }
      return null;
    };
  }
}

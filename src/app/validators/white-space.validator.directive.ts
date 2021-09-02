import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appWhitespace]',
})
export class WhiteSpaceValidatorDirective implements Validator {
  constructor() {}
  validate(control: AbstractControl): ValidationErrors | null {
    if (
      (control.value as string).indexOf(' ') >= 0 ||
      (control.value as string).match('/\A\s*\z/')
    ) {
      return { whiteSpace: true };
    }
    return null;
  }
}

import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appWhitespace]'
})
export class WhiteSpaceValidatorDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).trim().indexOf(' ')>=0) {
      return {whiteSpace:true};
    }
    return null;
  }

}

import { AbstractControl, ValidationErrors, AsyncValidator, AsyncValidatorFn } from '@angular/forms';
import { PaymentInfoService } from 'src/app/services/paymentInfo/paymentInfo.service'
import { Injectable } from '@angular/core';
import { PaymentInfo } from '../models/paymentInfo.model';


@Injectable({
    providedIn: 'root',
})
export class ShortcodeValidators {

    static paymentInfoObj: PaymentInfo;

    static valid(paymentInfoService: PaymentInfoService): AsyncValidatorFn {

        return (control: AbstractControl) => {

            return new Promise(async (resolve, reject) => {
                let paymentInfo = await paymentInfoService.searchShortcode(control.value).toPromise();
                console.log(`paymentInfo: ${paymentInfo}`)
                if (paymentInfo == null) {
                    resolve({ shortcodeInvalid: true });
                } else {
                    this.paymentInfoObj = paymentInfo;
                    resolve(null)
                }

            });
        }
    }

}

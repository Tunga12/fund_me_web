import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ShortcodeValidators } from 'src/app/validators/shortcode.validators';
import { PaymentInfoService } from 'src/app/services/paymentInfo/paymentInfo.service';

@Component({
  selector: 'set-shortcode',
  templateUrl: './set-shortcode.component.html',
  styleUrls: ['./set-shortcode.component.scss'],
})
export class SetShortcodeComponent implements OnInit {
  @Input() fundraiser!: Fundraiser;
  form!: FormGroup;
  @Output() next = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private paymentInfo: PaymentInfoService) { }

  ngOnInit(): void {
    // needs asynchronous validation
    this.form = this.formBuilder.group({
      shortcode: [undefined, {
        validators: [Validators.required],
        asyncValidators: [ShortcodeValidators.valid(this.paymentInfo)],
        updateOn: 'blur'
      }],

    });
  }

  async nextStep() {

    this.fundraiser = { ...this.fundraiser, paymentInfo: ShortcodeValidators.paymentInfoObj };
    console.log(this.fundraiser);
    this.next.emit(this.fundraiser);
  }

  // getters for form controls
  get shortcode(): AbstractControl | null {
    return this.form.get('shortcode');
  }


}

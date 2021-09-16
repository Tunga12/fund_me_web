import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { BeneficiaryService } from 'src/app/services/beneficiary/beneficiary.service';
import { WhiteSpaceValidatorDirective } from 'src/app/validators/white-space.validator.directive';

@Component({
  selector: 'app-beneficiary-form',
  templateUrl: './beneficiary-form.component.html',
  styleUrls: ['./beneficiary-form.component.scss']
})
export class BeneficiaryFormComponent implements OnInit, OnDestroy {
  beneficiary: User = { firstName: '', lastName: '', email: '' };

  form!: FormGroup;
  fundId: string = ''; // id of the fundraiser

  step = 'form'; // track weather to show the form or the  confirm page

  loading: boolean = false;
  errorMessage: string = '';

  // subscriptions
  activatedRouteSub?: Subscription;

  // validate the existance of whitesaces in our input
  whiteSpaceValidator = new WhiteSpaceValidatorDirective();


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private pageTitle: Title,

  ) { }

  ngOnInit(): void {
    this.pageTitle.setTitle('Invite Beneficiary');
    // get the id of the fundraiser
    this.activatedRouteSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.fundId = params.get('id') || '';
      // console.log(this.fundId);
    }
    )
    // create the form
    this.form = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          this.whiteSpaceValidator,
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          this.whiteSpaceValidator,
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });

    this.form.patchValue(this.beneficiary);
  }

  // listen to changes and update ouur model 'beneficiary'
  formChange() {
    this.beneficiary = this.form.value;
    // console.log(this.beneficiary);
  }

  

  // go to next step 'confirm'
  nextStep() {
    this.step = 'confirm';
  }

  // go to previous page 'form'
  previousPage() {
    this.step = 'form';
    this.form.patchValue(this.beneficiary);
  }

  /** getters for controls */
  public get firstName(): AbstractControl | null {
    return this.form.get('firstName');
  }

  public get lastName(): AbstractControl | null {
    return this.form.get('lastName');
  }

  public get email(): AbstractControl | null {
    return this.form.get('email');
  }

  ngOnDestroy(): void {
    this.activatedRouteSub?.unsubscribe();
  }
}

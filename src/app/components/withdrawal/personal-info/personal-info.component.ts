import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { UserWithdrawalService } from 'src/app/services/user-withdrawal/use-withdrawal.service';
import { WhiteSpaceValidatorDirective } from 'src/app/validators/white-space.validator.directive';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit,OnDestroy {
  form!: FormGroup;
  // validate the existence of white spaces in our input
  whiteSpaceValidator = new WhiteSpaceValidatorDirective();
  fundId = '';
  fundraiser!: Fundraiser;

  // loading and error message
  loading=false;
  errorMessage='';
  
  // subscriptions
  activatedRouteSub?: Subscription;
  withdrawalSub?: Subscription;
  fundraiserSub?: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private pageTitle: Title,
    private router: Router, private activatedRoute: ActivatedRoute,
    private withdrawalService: UserWithdrawalService,
    private fundraiserService: FundraiserService,
  ) { }

  ngOnInit(): void {
    this.pageTitle.setTitle('Legas | Add Beneficiary');
    // get the id of the fundraiser
    this.activatedRouteSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.fundId = params.get('id') || '';
      console.log(this.fundId);
    });

    // create the form
    this.form = this.formBuilder.group({
      bankName: ['', [Validators.required, Validators.minLength(3)]],
      bankAccountNo: ['', [Validators.required, Validators.minLength(3), this.whiteSpaceValidator,]],
    });
    this.getFundraiser();
  }


  // create withdrawal
  createWithdrawal() {
    this.loading=true;
    this.withdrawalSub = this.withdrawalService.createWithdrawal(
      this.fundId, { ...this.form.value, isOrganizer: true }
    ).subscribe(
      () => {
        console.log("withdrawal created");
        this.goToPersonalInfoSummary();
        this.loading=false;
      }
      , (error: HttpErrorResponse) => {
        this.loading=false;
        this.errorMessage="Unable to create withdrawal"
        console.log('error:',error.error);

      }
    );
  }

  // get the current fundraiser
  getFundraiser() {
    this.loading=true;
    this.fundraiserSub = this.fundraiserService
      .getFundraiser(this.fundId)
      .subscribe(
        (fund: Fundraiser) => {
          this.fundraiser = fund;
        this.loading=false;
        // if this fundraiser has a withdrawal info linked, show it
          if (this.fundraiser.withdraw) {
            this.form.patchValue(this.fundraiser.withdraw);
          }
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error;
        this.loading=false;
        console.log('Error while getting fundraiser:', error.error);
        }
      );
  }


  // getters for controls
  public get bankName(): AbstractControl {
    return this.form.get('bankName')!;
  }

  public get bankAccountNo(): AbstractControl {
    return this.form.get('bankAccountNo')!;
  }



  goBack() {
    this.activatedRoute.params.subscribe((param) => { console.log(param) }
    );
    this.router.navigate(['/withdrawal', this.fundId]);
  }

  goToPersonalInfoSummary() {
    this.router.navigate(['/withdrawal/personal-info-summary',this.fundId]);
  }

  ngOnDestroy(): void {
    this.withdrawalSub?.unsubscribe();
    this.activatedRouteSub?.unsubscribe();
    this.fundraiserSub?.unsubscribe();
  }
}

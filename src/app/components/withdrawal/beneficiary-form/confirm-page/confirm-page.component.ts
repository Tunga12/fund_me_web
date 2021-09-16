import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { BeneficiaryService } from 'src/app/services/beneficiary/beneficiary.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { UserWithdrawalService } from 'src/app/services/user-withdrawal/use-withdrawal.service';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.scss']
})
export class ConfirmPageComponent implements OnInit, OnDestroy {

  @Input() beneficiary!: User;

  fundId = '';


  loading: boolean = false;
  errorMessage: string = '';

  // subscriptions
  beneficiarySub?: Subscription;
  activatedRouteSub?: Subscription;
  withdrawalSub?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private beneficiaryService: BeneficiaryService,
    private router: Router,
    private snackBar: MatSnackBar,
    private snackbarServ: SnackbarService,
    private withdrawalService:UserWithdrawalService
  ) { }

  ngOnInit(): void {
    // get the id of the fundraiser
    this.activatedRouteSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.fundId = params.get('id') || '';
      // console.log(this.fundId);
    });

    console.log(this.beneficiary);

  }

  // invite beneficiary for a fundraiser
  inviteBeneficiary() {
    this.loading = true;
    this.beneficiarySub = this.beneficiaryService
      .inviteBeneficiary(this.fundId, this.beneficiary)
      .subscribe(
        () => {
          this.loading = false;
          // this.createWithdrawal();
          this.snackBar.open("Invitation successful", 'close', this.snackbarServ.getConfig())
          this.router.navigate(['/my-fundraiser/withdrawals', this.fundId,'overview']);
        },
        (error: HttpErrorResponse) => {
          console.error("Inviting beneficiary", error.error);
          this.loading = false;
          this.errorMessage = error.error;
        }
      );
  }

    // // create withdrawal
    // createWithdrawal() {
    //   this.loading=true;
    //   this.withdrawalSub = this.withdrawalService.createWithdrawal(
    //     this.fundId, {}
    //   ).subscribe(
    //     () => {
    //       console.log("withdrawal created");
    //       this.loading=false;
    //     }
    //     , (error: HttpErrorResponse) => {
    //       this.loading=false;
    //       this.errorMessage="Unable to create withdrawal"
    //       console.log('error:',error.error);
  
    //     }
    //   );
    // }

  
  
  ngOnDestroy(): void {
    this.beneficiarySub?.unsubscribe();
    this.activatedRouteSub?.unsubscribe();
    this.withdrawalSub
    ?.unsubscribe()
  }

}
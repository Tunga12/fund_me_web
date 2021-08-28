import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { FundraiserService } from './../../services/fundraiser/fundraiser.service';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { Subscription } from 'rxjs';
import { DonationService } from './../../services/donation/donation.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Donation } from 'src/app/models/donation.model';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';



@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css'],
})
export class DonateComponent implements OnInit, OnDestroy {
  // donation object
  donation: Donation = {
    amount: 0,
    tip: 10,
    memberId: ''

  };

  fundraiserId = '';
  loading = true; // to show/hide loading spinner
  erorrMessage = '';
  form!: FormGroup;
  fundraiser?: Fundraiser;
  // determines tip is from slider or not
  custom_tip = false;
  fundraiserSub?: Subscription;
  donationSub?: Subscription;



  public payPalConfig?: IPayPalConfig;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private donationService: DonationService,
    private router: Router,
    private title: Title,
    private snackBar: MatSnackBar,
    private snackbarServ: SnackbarService,
    public fundraiserService: FundraiserService
  ) { }


  ngOnInit(): void {
    this.title.setTitle('Donate');
    this.form = this.formBuilder.group({
      amount: [10, [Validators.required, Validators.min(5)]],
      tip: [15, [Validators.required, Validators.min(15)]],
      // anonymous: [],
      comment: [
        '', //[Validators.required, Validators.minLength(5)]
      ],
      isAnonymous: [false, []],
      memberId: '',
    });

    // get the Id f the fundraiser from the route
    this.fundraiserId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.getFundraiser();

    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      clientId: 'Aatbc1PvvGMzDDJXG_gpBOl3FKna4TAmIgtuyufjBGtsX514ZS2vLHNs-xRidfrSzxsQ9hbLawfGxlAu',
      createOrderOnClient: (data: any) => <ICreateOrderRequest><unknown>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            value: this.donation.amount + (this.donation.amount * this.donation.tip / 100),
          },
        }]
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.donate();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.snackBar.open("Donation cacelled", "close", this.snackbarServ.getConfig())
      },
      onError: err => {
        console.log('OnError', err);
        this.snackBar.open("Some thing went wrong", "close", this.snackbarServ.getConfig())

      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }




  // observe the form changes to our model
  formChange() {
    this.donation = this.form.value;
    // console.log(donation);

  }

  // // check if this user has already donated to this fundraiser

  // hasAlreadyDonated(): boolean {
  //   let userId = localStorage.getItem('userId');
  //   let donor = this.fundraiser?.donations?.find((donation: Donation) => donation.userId?._id === userId);
  //   return donor ? true : false;
  // }

  public get amount(): AbstractControl | null {
    return this.form.get('amount');
  }

  public get tip(): AbstractControl | null {
    return this.form.get('tip');
  }

  public get comment(): AbstractControl | null {
    return this.form.get('comment');
  }

  public get memberId(): AbstractControl | null {
    return this.form.get('memberId');
  }

  // set  tip
  set tip(amount) {
    this.form.patchValue({ tip: amount });
  }

  get tip_percentage(): number {
    return (this.amount?.value * this.tip?.value) / 100;
  }

  percentSymbol() {
    return (number: number) => number + '%';
  }

  // make donation to a fundriser
  donate() {
    this.loading = true;
    this.donation = this.form.value;
    if (!this.memberId || !this.memberId!.value) {
      delete this.donation['memberId'];
    }

    this.donationSub = this.donationService
      .createDonation(this.fundraiserId, this.form.value)
      .subscribe(
        (response: HttpResponse<any>) => {
          this.snackBar.open("Donation successfully completed", "close", this.snackbarServ.getConfig());
          this.loading = false;
          this.router.navigate(['/fundraiser-detail', this.fundraiserId]);
        },
        (error: HttpErrorResponse) => {
          this.erorrMessage = error.error;
          this.snackBar.open("Donation not successfull", "close", this.snackbarServ.getConfig())
          this.loading = false;
          console.log(error);
        }
      );
  }

  // get fundraiser to be donated for
  getFundraiser() {
    this.fundraiserSub = this.fundraiserService
      .getFundraiser(this.fundraiserId)
      .subscribe(
        (fund) => {
          this.fundraiser = fund;
          this.loading = false;
        },
        (eror) => {
          // TODO handle error
          this.loading = false;
          this.erorrMessage = eror.error;
        }
      );
  }

  // assign slider value or custom tip to tip amount
  sliderChange(event: any) {
    if (event.value < 10) {
      setTimeout(() => {
        event.source.value = 10;
        this.tip = event.value > 10 ? event.value : 10;
      });
    }
  }


  changeTipType() {
    this.custom_tip = !this.custom_tip;
  }

  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
    this.donationSub?.unsubscribe();
  }
}

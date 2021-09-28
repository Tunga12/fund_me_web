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
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Donation } from 'src/app/models/donation.model';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
})
export class DonateComponent implements OnInit, OnDestroy {
  // donation object
  donation: Donation = {
    amount: 0,
    tip: 10,
    memberId: '',
    paymentMethod: 'PayPal',
  };

  fundraiserId = '';
  loading = true; // to show/hide loading spinner
  errorMessage = '';
  form!: FormGroup;
  fundraiser?: Fundraiser;

  // subscriptions
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
    private snackbarService: SnackbarService,
    public fundraiserService: FundraiserService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Donate');
    this.form = this.formBuilder.group({
      amount: [10, [Validators.required, Validators.min(5)]],
      tip: [10, [Validators.required, Validators.min(10)]],
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

    this.donation = { ...this.donation, ...this.form.value };
  }

  private initConfig(): void {
    this.payPalConfig = {
      clientId:
        'Aatbc1PvvGMzDDJXG_gpBOl3FKna4TAmIgtuyufjBGtsX514ZS2vLHNs-xRidfrSzxsQ9hbLawfGxlAu',
      createOrderOnClient: (data: any) => <ICreateOrderRequest>(<unknown>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                value:
                  this.donation.amount +
                  (this.donation.amount * this.donation.tip) / 100,
              },
            },
          ],
        }),
      advanced: {
        extraQueryParams: [{ name: 'disable-funding', value: 'credit,card' }],
      },

      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.donate();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.snackBar.open(
          'Donation cancelled',
          'close',
          this.snackbarService.getConfig()
        );
      },
      onError: (err) => {
        console.log('OnError', err);
        this.snackBar.open(
          'Some thing went wrong',
          'close',
          this.snackbarService.getConfig()
        );
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  // observe the form changes to our model
  formChange() {
    this.donation = { ...this.donation, ...this.form.value };
  }

  /* getters for form controls*/
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

  // go to paypal page
  goToPayPal() {
    // // remove the memberId field if its value is empty
    if (!this.memberId || !this.memberId!.value) {
      // delete this.donation['memberId'];
      this.donation.memberId = this.fundraiser?.teams![0].id._id;
    }

    if (!this.donation.comment) {
      delete this.donation['comment'];
    }
    this.donationService.goToPayPal(this.fundraiserId, this.donation).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  // make donation to a fundraiser
  donate() {
    this.loading = true;
    this.donation = { ...this.donation, ...this.form.value };
    // remove the memberId field if its value is empty
    if (!this.memberId || !this.memberId!.value) {
      // delete this.donation['memberId'];
      this.donation.memberId = this.fundraiser?.teams![0].id._id;
    }

    this.donationSub = this.donationService
      .createDonation(this.fundraiserId, this.donation)
      .subscribe(
        (response: HttpResponse<any>) => {
          console.log(response);

          this.snackBar.open(
            'Donation successfully completed',
            'close',
            this.snackbarService.getConfig()
          );
          setTimeout(() => {
            this.loading = false;
            this.router.navigate(['/fundraiser-detail', this.fundraiserId]);
          }, 2000);
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error;
          this.snackBar.open(
            'Donation not successful',
            'close',
            this.snackbarService.getConfig()
          );
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
        (error) => {
          this.loading = false;
          this.errorMessage = error.error;
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

  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
    this.donationSub?.unsubscribe();
  }
}

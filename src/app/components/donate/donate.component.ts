import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css'],
})
export class DonateComponent implements OnInit, OnDestroy {
  loading = true; // to show/hide loading spinner
  erorrMessage = '';
  form!: FormGroup;
  fundraiser?: Fundraiser;
  fundraiserId = '';
  // determines tip is from slider or not
  custom_tip = false;
  fundraiserSub?: Subscription;
  donationSub?: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private fundraiserService: FundraiserService,
    private activatedRoute: ActivatedRoute,
    private donationService: DonationService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amount: [undefined, [Validators.required]],
      tip: [10, [Validators.required, Validators.min(10)]],
      // anonymous: [],
      comment: ['', [Validators.required, Validators.minLength(5)]],
    });

    // get the Id f the fundraiser from the route
    this.fundraiserId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    console.log(this.fundraiserId);

    this.getFundraiser();
  }

  public get amount(): AbstractControl | null {
    return this.form.get('amount');
  }
  public get tip(): AbstractControl | null {
    return this.form.get('tip');
  }
  public get comment(): AbstractControl | null {
    return this.form.get('comment');
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
    this.donationSub = this.donationService
      .createDonation(this.fundraiserId, {
        ...this.form.value,
        memberId: this.fundraiser?.organizer?._id,
      })
      .subscribe(
        () => {
          this.router.navigateByUrl(`/fundraiser-detail/${this.fundraiserId}`);
          this.loading = false;
        },
        (error: HttpErrorResponse) => {
          this.erorrMessage = error.error;
          this.loading = false;
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

  backToFundraiser() {
    this.router.navigate(['/fundraiser-detail', this.fundraiserId]);
  }

  changeTipType() {
    this.custom_tip = !this.custom_tip;
  }

  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
    this.donationSub?.unsubscribe();
  }
}

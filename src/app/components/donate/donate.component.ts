import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FundraiserService } from './../../services/fundraiser/fundraiser.service';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { Subscription } from 'rxjs';
import { Donation } from './../../models/donation.model';
import { MatSlider } from '@angular/material/slider';
import { DonationService } from './../../services/donation/donation.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css'],
})
export class DonateComponent implements OnInit, OnDestroy {
  erorrMessage = "";
  form!: FormGroup;
  fundraiser?: Fundraiser;
  fundraiserId = '';
  // determines tip is from slider or not
  custom_tip = false;
  fundraiserSub?: Subscription;
  donationSub?: Subscription;

  donation = {
    comment: '',
    amount: 0,
    tip: 5,
    memberId: '',
  };
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private fundraiserService: FundraiserService,
    private activatedRoute: ActivatedRoute,
    private donationService: DonationService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      donation_amount: [],
      tip_amount: [],
      anonymous: [],
      comment: [],
    });

    // get the Id f the fundraiser from the route
    this.fundraiserId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    console.log(this.fundraiserId);

    this.getFundraiser();
  }

  // make donation to a fundriser
  donate() {
    console.log(this.donation);
    console.log(this.fundraiser?._id);
    this.donationSub = this.donationService
      .createDonation(this.fundraiserId, this.donation)
      .subscribe(() => {
        this.router.navigateByUrl(`/fundraiser-detail/${this.fundraiserId}`)
      },
        (error: HttpErrorResponse)=>{
          this.erorrMessage = error.error;
        }
      
      
    );
  }

  // get fundraiser to be donated for
  getFundraiser() {
    this.fundraiserSub = this.fundraiserService
      .getFundraiser(this.fundraiserId)
      .subscribe((fund) => {
        this.fundraiser = fund;
        this.donation.memberId = this.fundraiser?.beneficiary?._id || '';
        // TODO :this is for testingg purpose only
        // update member id of the fundriser to orignizers id
        this.donation.memberId = this.fundraiser?.beneficiary?._id || '';
        console.log('ogzr', this.fundraiser?.beneficiary?._id);
      });
  }

  // assign slider value to tip amount
  sliderChange(slider: MatSlider) {
    this.donation.tip = slider.value as number;
  }

  backToFundraiser() {
    this.router.navigateByUrl('/donate');
  }

  changeTipType() {
    this.custom_tip = !this.custom_tip;
  }

  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
    this.donationSub?.unsubscribe();
  }
}

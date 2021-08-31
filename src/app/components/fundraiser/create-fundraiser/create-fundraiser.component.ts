import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationService } from './../../../services/location/location.service';
import { Fundraiser } from './../../../models/fundraiser.model';
import { FundraiserService } from './../../../services/fundraiser/fundraiser.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'create-fundraiser',
  templateUrl: './create-fundraiser.component.html',
  styleUrls: ['./create-fundraiser.component.css'],
})
export class CreateFundraiserComponent implements OnInit, OnDestroy {
  currentStep = 1; // keep trrack of steps
  fundraiser!: Fundraiser;
  // location info
  locationSub?: Subscription;
  // fundraiser subscription
  fundraiserSub?: Subscription;
  errorMessage = '';

  constructor(
    private locationServ: LocationService,
    private fundraiserServ: FundraiserService,
    private router: Router,
    private docTitle: Title
  ) {}

  ngOnInit(): void {
    this.docTitle.setTitle('Create campaign');
    // initialise the fundriser with empty fields
    this.fundraiser = {
      goalAmount: undefined,
      category: undefined,
      title: '',
      story: '',
      image: '',
      location: {
        latitude: 0,
        longitude: 0,
      },
    };
    this.getCurrentLocation();
  }

  // subit the form to create teh fundraiser
  submit(fundraiser: Fundraiser) {
    if (!fundraiser.image) {
      delete fundraiser.image;
    }
    // post fundraiser
    this.fundraiserSub = this.fundraiserServ
      .createFundraiser(fundraiser)
      .subscribe(
        (fund) => {
          console.log(fund);
          this.router.navigateByUrl(`/my-fundraisers`);
        },
        (error) => {
          this.errorMessage = error.error;
        }
      );
  }

  // get current location of the user in terms of latitude and longitude
  getCurrentLocation() {
    this.locationSub = this.locationServ
      .getPosition()
      .subscribe((currentLocation) => {
        this.fundraiser.location = currentLocation;
      });
  }
  //function to return list of numbers from 0 to n-1
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  // navigate to previos step
  previousStep() {
    if (this.currentStep > 1) this.currentStep -= 1;
  }

  // navigate to next step 'photo'
  next(fundraiser: Fundraiser) {
    if (this.currentStep < 3) {
      this.currentStep += 1;
    }
    this.fundraiser = fundraiser;
    console.log(this.currentStep, fundraiser);
  }

  ngOnDestroy(): void {
    if (this.fundraiserSub) this.fundraiserSub.unsubscribe();
    if (this.locationSub) this.locationSub.unsubscribe();
  }
}

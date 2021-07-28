import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css'],
})
export class DonateComponent implements OnInit {
  form: FormGroup;
  tip_amount = 5;
  donation_amount = 5;

  // determines tip is from slider or not
  custom_tip = false;

  // make donation anonymous or not.
  anonymous = false;
  constructor(private router: Router) {
    this.form = new FormGroup({
      donation_amount: new FormControl(),
      tip_amount: new FormControl(),
      anonymous: new FormControl(),
    });
  }
  ngOnInit(): void {}
  backToFundraiser() {
    this.router.navigateByUrl('/donate');
  }
  sliderChange(slider: MatSlider) {
    this.tip_amount = slider.value as number;
    // console.log(slider);
    console.log(this.donation_amount);
    console.log(this.tip_amount);
  }
  changeTipType() {
    this.custom_tip = !this.custom_tip;
  }
  changeAnonymity() {
    this.anonymous = !this.anonymous;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fundraiser-list',
  templateUrl: './fundraiser-list.component.html',
  styleUrls: ['./fundraiser-list.component.css'],
})
export class FundraiserListComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  manageFundraiser() {
    this.router.navigateByUrl('/my-fundraiser-detail');
  }

  createFundraiser() {
    this.router.navigateByUrl('/create');
  }
}

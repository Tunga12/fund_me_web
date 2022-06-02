import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faCoins, faDonate } from '@fortawesome/free-solid-svg-icons';
import { Donation } from 'src/app/models/donation.model';
import { FundraiserPage } from 'src/app/models/fundraiser-page.model';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { User } from 'src/app/models/user.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

import { AdminDonationsService } from '../../services/admin-donations/admin-donations.service';
import { AdminUsersService } from '../../services/admin-users/admin-users.service';
import { Title } from '@angular/platform-browser';
import { CurrencyConverterService } from './../../../services/currency-converter/currency-converter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  coinIcon = faCoins;
  donateIcon = faDonate;

  fundraiserPage?: FundraiserPage;

  // fundraisers
  allFundraisers: Fundraiser[] = [];
  filteredFundraisers: Fundraiser[] = [];

  //donations
  allDonations: Donation[] = [];
  filteredDonations: Donation[] = [];

  // users
  filteredUsers: User[] = [];
  allUsers: User[] = [];
  // totalRaised = 0;
  // totalTip = 0;
  loading: boolean = false;
  errorMessage: string = '';
  currentPage: number = 0;

  dateChosen: Date = new Date('0');
  endDate: Date = new Date();

  totalCampaign = 0;
  totalDonation = 0;
  totalUser = 0;
  totalRaised: { countBirr: number; countDollar: number } = {
    countBirr: 0,
    countDollar: 0,
  };
  totalTip: { countBirr: number; countDollar: number } = {
    countBirr: 0,
    countDollar: 0,
  };

  // currency
  exchangeRateSubscription?: Subscription;
  exchangeRate: number = 1;
  constructor(
    private fundraiserService: FundraiserService,
    private usersService: AdminUsersService,
    private adminDonationService: AdminDonationsService,
    private title: Title,
    private currencyService: CurrencyConverterService
  ) {}

  async ngOnInit() {
    this.title.setTitle('Admin | statistics');
    this.loading = true;
    this.getExchangeRate();

    // await this.getAllFundraisers();
    // this.getFundraisersByDate(this.dateChosen, this.endDate);
    this.totalCampaign = await this.getFundraisersCount(
      this.dateChosen,
      this.endDate
    );

    this.totalDonation = await this.getDonationsCount(
      this.dateChosen,
      this.endDate
    );

    // console.log(this.allFundraisers);

    // await this.getUsers();
    // this.getUsersByDate(this.dateChosen, this.endDate);
    this.totalUser = await this.getUsersCount(this.dateChosen, this.endDate);

    // await this.getAllDonations();
    // this.getFilteredDonationsByDate(this.dateChosen, this.endDate);
    this.totalRaised = await this.getTotalRaised(this.dateChosen, this.endDate);
    this.totalTip = await this.getTotalTip(this.dateChosen, this.endDate);
    this.loading = false;
  }

  // get the current currency exchange rate
  async getExchangeRate() {
    this.exchangeRate = await this.currencyService.getExchangeRate();
  }

  // when a user select a date range
  async dateRangeChange(
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) {
    // this.totalRaised = 0;
    // this.totalTip = 0;
    this.loading = true;
    let startDate = new Date(dateRangeStart.value);
    let endDate = new Date(dateRangeEnd.value);
    this.totalCampaign = await this.getFundraisersCount(startDate, endDate);

    this.totalUser = await this.getUsersCount(startDate, endDate);

    this.totalDonation = await this.getDonationsCount(startDate, endDate);

    this.totalRaised = await this.getTotalRaised(startDate, endDate);

    this.totalTip = await this.getTotalTip(startDate, endDate);
    this.loading = false;
  }

  async getFundraisersCount(startDate: Date, endDate: Date) {
    return await this.fundraiserService.getFundraisersCount(startDate, endDate);
  }

  async getDonationsCount(startDate: Date, endDate: Date) {
    return await this.adminDonationService.getDonationsCount(
      startDate,
      endDate
    );
  }

  async getUsersCount(startDate: Date, endDate: Date) {
    return await this.usersService.getUsersCount(startDate, endDate);
  }

  async getTotalRaised(startDate: Date, endDate: Date) {
    return await this.adminDonationService.getTotalRaised(startDate, endDate);
  }

  async getTotalTip(startDate: Date, endDate: Date) {
    return await this.adminDonationService.getTotalTip(startDate, endDate);
  }
}

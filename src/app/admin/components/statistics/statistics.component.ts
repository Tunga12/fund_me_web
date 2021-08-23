import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { Donation } from 'src/app/models/donation.model';
import { FundraiserPage } from 'src/app/models/fundraiser-page.model';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { User } from 'src/app/models/user.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { AdminDonationsService } from '../../services/admin-donations/admin-donations.service';
import { AdminUsersService } from '../../services/admin-users/admin-users.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
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
  totalRaised = 0;

  loading: boolean = false;
  errorMessage: string = '';
  currentPage: number = 0;
  dateChosen: Date = new Date('2021-07-29T13:10:10.626Z');
  endDate: Date = new Date();
  constructor(
    private fundraiserService: FundraiserService,
    private usersService: AdminUsersService,
    private adminDonationService: AdminDonationsService
  ) { }

  async ngOnInit() {
    this.loading = true;
    await this.getAllFundraisers();
    this.getFudraisersByDate(this.dateChosen, this.endDate);

    await this.getUsers();
    this.getUsersByDate(this.dateChosen, this.endDate);

    await this.getAllDonations();
    this.getFilteredDonationsByDate(this.dateChosen, this.endDate);
    this.getTotalRaised();
    this.loading = false;
  }

  async dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    this.totalRaised = 0;
    this.loading = true;
    let startDate = new Date(dateRangeStart.value)
    let endDate = new Date(dateRangeEnd.value)
    await this.getFudraisersByDate(startDate, endDate);
    await this.getUsersByDate(startDate, endDate);
    await this.getFilteredDonationsByDate(startDate, endDate);
    await this.getTotalRaised();
    this.loading = false;
  }

  //get all fundraisers
  async getAllFundraisers() {
    do {
      await this.getFundraisers();
    } while (this.currentPage < this.fundraiserPage?.totalPages!);
  }

  //get fundrisers of the first page
  async getFundraisers() {
    this.loading = true;
    await this.fundraiserService
      .getFundraisersAdmin(this.currentPage)
      .then(
        (fundraiserPage: FundraiserPage) => {
          this.fundraiserPage = fundraiserPage;
          this.allFundraisers = [
            ...this.allFundraisers,
            ...fundraiserPage.fundraisers,
          ];
          this.loading = false;
          this.currentPage++;
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          console.log(error.error);
          this.errorMessage = 'Unable to load fundraisers';
        }
      );
  }

  // filter fundraisers by date
  async getFudraisersByDate(startDate: Date, endDate: Date) {
    this.filteredFundraisers = await this.allFundraisers.filter((fund: Fundraiser) => startDate <= new Date(fund.dateCreated!) && new Date(fund.dateCreated!) <= endDate);
  }

  // get #fundraisers 
  getNumberOfFundraisersCreated(): number {
    return this.filteredFundraisers.length;
  }



  // get all users
  async getUsers() {
    await this.usersService.getAllUsers().then(
      (users: User[]) => this.allUsers = users,
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  // get users by date 
  async getUsersByDate(startDate: Date, endDate: Date) {
    this.filteredUsers = await this.allUsers.filter(user => startDate <= new Date(user.date!) && new Date(user.date!) <= endDate)
  }

  //get all donations
  async getAllDonations() {
    await this.adminDonationService.getAllDonations().then(
      (donations) => this.allDonations = donations
    );
  }

  //get filtered donations by date
  async getFilteredDonationsByDate(startDate: Date, endDate: Date) {
    this.filteredDonations = await this.allDonations.filter(
      (donation) => startDate <= new Date(donation.date!) && new Date(donation.date!) <= endDate)
  }

  // get total raised
  async getTotalRaised() {
    await this.filteredDonations.forEach(
      (donation) => this.totalRaised += donation.amount
    );
  }

}


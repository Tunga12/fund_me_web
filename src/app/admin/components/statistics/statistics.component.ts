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

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  coinIcon= faCoins;
  donateIcon= faDonate;


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
  totalTip = 0;
  loading: boolean = false;
  errorMessage: string = '';
  currentPage: number = 0;

  dateChosen: Date = new Date('2021-07-29T13:10:10.626Z');
  endDate: Date = new Date();
  constructor(
    private fundraiserService: FundraiserService,
    private usersService: AdminUsersService,
    private adminDonationService: AdminDonationsService
   , private title: Title,
    ) { }

  async ngOnInit() {
    this.title.setTitle('Admin | statistics');
    this.loading = true;
    await this.getAllFundraisers();
    this.getFudraisersByDate(this.dateChosen, this.endDate);

    // console.log(this.allFundraisers);
    
    await this.getUsers();
    this.getUsersByDate(this.dateChosen, this.endDate);

    await this.getAllDonations();
    this.getFilteredDonationsByDate(this.dateChosen, this.endDate);
    this.getTotalRaised();
    this.loading = false;
  }

  async dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    this.totalRaised = 0;
    this.totalTip=0;
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

  //get fundrisers of a page
  async getFundraisers() {
    this.loading = true;
    await this.fundraiserService
      .getFundraisersAdmin(this.currentPage)
      .then(
        (fundraiserPage: FundraiserPage) => {
          this.fundraiserPage = fundraiserPage;
          console.log(fundraiserPage.fundraisers);
          
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
    this.filteredFundraisers = await this.allFundraisers.filter((fund: Fundraiser) => {
      let creationDate=  new Date(fund.dateCreated!);
      return startDate <= creationDate && creationDate <= endDate;
    });
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
    this.filteredUsers = await this.allUsers.filter(user => {
      let signupDate = new Date(user.date!);
     return (startDate <= signupDate) && (signupDate <= endDate);
    });
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
      (donation) => {
        let donationDate = new Date(donation.date!);
        return (startDate <= donationDate && donationDate <= endDate) 
      });
  }

  // get total raised
  async getTotalRaised() {
    await this.filteredDonations.forEach(
      (donation) => {
        this.totalRaised += donation.amount;
        this.totalTip += donation.tip;
      }
    );
  }

}


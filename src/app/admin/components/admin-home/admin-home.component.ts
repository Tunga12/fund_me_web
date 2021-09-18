import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserPage } from 'src/app/models/fundraiser-page.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit ,OnDestroy{
  loading = false; // to show loading spinner till the fundraisers are available
  errorMessage = '';

  searchedFundraisers: Fundraiser[] = [];

  fundraiserSub?: Subscription;

  fundraiserHome?: FundraiserPage;
  currentPage: number = 0;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fundraiserService: FundraiserService,
    private docTitle: Title
  ) { }

  ngOnInit(): void {
    this.docTitle.setTitle('Legas | Admin home');
    this.form = this.fb.group(
      {
        title: ''
      }
    );
  }

  //search fundraisers of the current page
  searchFundraisers() {
    this.searchedFundraisers=[];
    this.loading=true;
    let title = this.form.controls['title'].value;
    this.fundraiserSub = this.fundraiserService
      .search(title, this.currentPage)
      .subscribe(
        (fundraiserHome: FundraiserPage) => {
          this.fundraiserHome = fundraiserHome;
          this.searchedFundraisers = [
            ...fundraiserHome.fundraisers,
          ];
          this.loading = false;
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          console.log(error.error);
          this.errorMessage = 'Unable to load fundraisers';
        }
      );
  }

  // checks if the current page has next page
  hasNext() {
    return this.fundraiserHome?.hasNextPage || false;
  }

  // get the fundraisers on the next page
  nextPage() {
    this.currentPage += 1;
    this.searchFundraisers();
  }

  percentage(fund: Fundraiser): number {
    return this.fundraiserService.getPercentage(fund);
  }

  // unsubscribe if from all subscriptions
  ngOnDestroy(): void {
    if (this.fundraiserSub) this.fundraiserSub.unsubscribe();
  }
}
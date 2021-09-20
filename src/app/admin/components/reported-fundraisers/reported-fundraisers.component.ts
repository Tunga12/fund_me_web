import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { ReportedFundsService } from '../../services/reported-funds/reported';
import { FundraiserService } from './../../../services/fundraiser/fundraiser.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Report } from 'src/app/models/report.model';
import { ReportedFundraiser } from './../../models/reported-fundraiser.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { SnackbarService } from './../../../services/snackbar/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reported-fundraisers',
  templateUrl: './reported-fundraisers.component.html',
  styleUrls: ['./reported-fundraisers.component.scss'],
})
export class ReportedFundraisersComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  loading = false;
  errorMessage = '';

  // table data
  displayedColumns = ['title',  'totalRaised', 'view', 'block'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;
  //data source for the table
  dataSource = new MatTableDataSource<ReportedFundraiser>();

  reports: Report[] = []; // reports
  reportedFundraisers: ReportedFundraiser[] = []; // reports with their fundraiser

  fundraisers: Fundraiser[] = [];

  // subscriptions
  reportSub?: Subscription;

  constructor(
    private reportServ: ReportedFundsService,
    private fundraiserServ: FundraiserService,
    private pageTitle: Title,
    private cdr: ChangeDetectorRef,
    private fundraiserService: FundraiserService,
    private snackbarService: SnackbarService,
    private snackBar: MatSnackBar
  ) {}

   ngOnInit() {
    this.pageTitle.setTitle('Reported fundraisers');
     this.getReports();
     this.getFundraisers();
     this.getReportedFundraisers();
  }

   getReports() {
    this.loading = true;
    this.reportSub = this.reportServ.getReports().subscribe(
       (reports) => {
        this.reports = reports;
        console.log(reports);
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.errorMessage = error.error;
      }
    );
  }

  // get fundraisers if they are reported(if their id is in the list of reports)
   getFundraisers() {
     this.reports.forEach(async (report) => {
      await this.fundraiserServ.getFundraiser(report.fundraiserId).subscribe(
        (fund) => {
          if (!this.fundraisers.includes(fund)) {
            this.fundraisers.push(fund);
            console.log(fund);
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.errorMessage = error.error;
        }
      );
    });
  }

  // get fundraisers with their reports
   getReportedFundraisers() {    
    let reportedFund: ReportedFundraiser;
     this.fundraisers.forEach( (fundraiser) => {
      let reports = this.reports.filter(
        (report) => report.fundraiserId === fundraiser._id
      );
      reportedFund = { fundraiser: fundraiser, reports: reports };
      this.reportedFundraisers.push(reportedFund);
      console.log(reportedFund);
    });
    this.loading=false;
  }

  blockFundraiser(fundraiser: Fundraiser) {
    this.fundraiserService
      .editFundraiser(fundraiser._id!, { ...fundraiser, isBlocked: true })
      .subscribe(
        () => {
          this.snackBar.open(
            'Fundraiser blocked successfully',
            'close',
            this.snackbarService.getConfig()
          );
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(
            'Unable to block fundraiser',
            'close',
            this.snackbarService.getConfig()
          );
          this.errorMessage = error.error;
          console.log(error.error);
        }
      );
  }

  ngAfterViewInit() {
    this.dataSource.data = this.reportedFundraisers;
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.reportSub?.unsubscribe();
  }
}

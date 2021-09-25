import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ReportedFundsService } from '../../services/reported-funds/reported';
import { FundraiserService } from './../../../services/fundraiser/fundraiser.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Report } from 'src/app/models/report.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { SnackbarService } from './../../../services/snackbar/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface FilteredReport {
  report: Report;
  occurrence: number;
}

export interface ReportedFundraiser {
  fundraiser: Fundraiser;
  reports: FilteredReport[];
}
@Component({
  selector: 'app-reported-fundraisers',
  templateUrl: './reported-fundraisers.component.html',
  styleUrls: ['./reported-fundraisers.component.scss'],
})
export class ReportedFundraisersComponent implements OnInit, OnDestroy {
  loading = false;
  errorMessage = '';

  // table data
  displayedColumns = [
    'title',
    'totalRaised',
    'reasons',
    'totalReports',
    'view',
    'block',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;
  //data source for the table
  dataSource = new MatTableDataSource<ReportedFundraiser>();

  reports: Report[] = []; // all reports

  filteredReports: FilteredReport[] = [];
  reportedFundraisers: ReportedFundraiser[] = []; // reports with their fundraiser

  fundraisers: Fundraiser[] = [];

  // subscriptions
  reportSub?: Subscription;

  constructor(
    private reportServ: ReportedFundsService,
    private fundraiserServ: FundraiserService,
    private pageTitle: Title,
    private fundraiserService: FundraiserService,
    private snackbarService: SnackbarService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.pageTitle.setTitle('Reported fundraisers');
    this.loading = true;
    await this.getReports();
    await this.getFundraisers();
    this.groupReports();
    console.log(this.filteredReports);

    this.loading = false;
  }

  // get all available reports
  async getReports() {
    return new Promise((resolve) => {
      this.reportSub = this.reportServ.getReports().subscribe(
        (reports) => {
          this.reports = reports;
          console.log(reports);
          resolve(true);
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.errorMessage = error.error;
          resolve(true);
        }
      );
    });
  }

  // get fundraisers if they are reported(if their id is in the list of reports)
  async getFundraisers() {
    return new Promise(async (resolve) => {
      if (this.reports.length === 0) {
        resolve(true);
      }
      await this.reports.forEach(async (report, index) => {
        // check if the fundraiser is already fetched(available in the list)
        let fund = this.fundraisers.find(
          (fundraiser) => fundraiser._id === report.fundraiserId
        );

        if (fund === undefined) {
          await this.fundraiserServ
            .getFundraiser(report.fundraiserId)
            .subscribe(
              async (fund) => {
                this.fundraisers.push(fund);
                await this.combineFundraiserToReports(fund);
              },
              (error: HttpErrorResponse) => {
                console.log(error.error);
                this.errorMessage = error.error;
              }
            );
        }
        if (index === this.reports.length - 1) {
          resolve(true);
        }
      });
    });
  }

  // combines a fundraiser to its respective  reports
  combineFundraiserToReports(fundraiser: Fundraiser) {
    let reportedFund: ReportedFundraiser;
    let reports = this.filteredReports.filter(
      (report) => report.report.fundraiserId === fundraiser._id
    );
    reportedFund = { fundraiser: fundraiser, reports: reports };

    // check if this report is already existing, if not add it to the list 'reportedFundraisers'
    let existingFund = this.reportedFundraisers.find(
      (fund) => fund.fundraiser._id === reportedFund.fundraiser._id
    );
    if (!existingFund) {
      this.reportedFundraisers.push(reportedFund);
    }
    // update the dataSource to the current list
    this.updateTable();
  }

  // block a fundraiser
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

  // group reports based on their id and the fundraiser they correspond to
  groupReports() {
    this.reports.forEach((report) => {
      let filteredReport = this.includes(this.filteredReports, report);
      console.log(filteredReport);
      if (filteredReport) {
        console.log(true);
        let index = this.filteredReports.indexOf(filteredReport);
        let updatedReport: FilteredReport = {
          ...filteredReport,
          occurrence: filteredReport.occurrence+1,
        };
        console.log(updatedReport);
        
        this.filteredReports.splice(index,1,updatedReport);
      } else {
        this.filteredReports.push({ report: report, occurrence: 1 });
      }
    });
  }

  // checks if a report is in filtered reports array and returns the element if it exists
  includes(array: FilteredReport[], element: Report) {
    let found = array.find(
      (filteredReport) =>
        filteredReport.report.reason._id === element.reason._id &&
        filteredReport.report.fundraiserId === element.fundraiserId
    );
    return found;
  }

  // counts and returns the total reports of a given reported fundraiser
  countReports(reportedFund:ReportedFundraiser){
    let total=0;
    reportedFund.reports.forEach(report=>{
      total+=report.occurrence;
    })
    return total;
  }

  // updates the table to the current dataSource
  updateTable() {
    console.log(this.reportedFundraisers);
    this.dataSource.data = this.reportedFundraisers;
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  // when this component is destroyed unsubscribe from all available subscriptions
  ngOnDestroy(): void {
    this.reportSub?.unsubscribe();
  }
}

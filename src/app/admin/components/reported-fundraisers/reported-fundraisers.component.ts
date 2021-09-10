import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ReportedFundsService } from '../../services/reported-funds/reporeted-funds.service';
import { FundraiserService } from './../../../services/fundraiser/fundraiser.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Report } from 'src/app/models/report.model';
import { ReportedFundraiser } from './../../models/reported-fundraiser.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Withdrawal } from 'src/app/models/withdrawal.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reported-fundraisers',
  templateUrl: './reported-fundraisers.component.html',
  styleUrls: ['./reported-fundraisers.component.css'],
})
export class ReportedFundraisersComponent implements OnInit, OnDestroy {
  loading = false;
  errorMessage = '';

  // table data
  displayedColumns = [
    "title","reason","totalRaised",'view'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;
  //datasource for the table
  dataSource = new MatTableDataSource<ReportedFundraiser>();

  reports: Report[] = []; // reports
  reportedFundraisers: ReportedFundraiser[] = []; // reports with their fundraiser

  // subscriptions
  reportSub?: Subscription;

  constructor(
    private reportServ: ReportedFundsService,
    private fundraiserServ: FundraiserService,
    private pageTitle: Title,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.pageTitle.setTitle('Reported fundraisers');

    await this.getReports();
  }

  async getReports() {
    this.reportSub = await this.reportServ.getReports().subscribe(
      async (reports) => {
        this.reports = reports;
        await this.getReportedFundraisers(reports);
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.loading = false;
        this.errorMessage = error.error;
      }
    );
  }

  // get fundraisers with their reports
  async getReportedFundraisers(reports: Report[]) {
    let reportedFund: ReportedFundraiser;
    await reports.forEach(async (report) => {
      await this.fundraiserServ.getFundraiserAsync(report.fundraiserId).then(
        (fund) => {
          reportedFund = { fundraiser: fund, report: report };
          this.reportedFundraisers.push(reportedFund);
          this.dataSource.data = this.reportedFundraisers;
          this.cdr.detectChanges();
          this.dataSource.paginator = this.paginator;
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.errorMessage = error.error;
        }
      );
    });
    this.loading=false;
  }

  ngOnDestroy(): void {
    this.reportSub?.unsubscribe();
  }
}

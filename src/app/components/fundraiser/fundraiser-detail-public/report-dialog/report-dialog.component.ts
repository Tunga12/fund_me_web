import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from './../../../../services/report/report.service';
import { Subscription } from 'rxjs';
import { Report } from './../../../../models/report.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css'],
})
export class ReportDialogComponent implements OnInit, OnDestroy {
  loading = false;
  errorMessage = '';
  choices = [
    'child abuse',
    'spam or misleading',
    "doesn't represent myself",
    'not a company person',
    'infirges my rights',
  ];
  fundraiserId = '';
  form!: FormGroup;
  // subscriptions
  reportSub?: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private reportSrv: ReportService,
    private dilogRef: MatDialogRef<ReportDialogComponent>,
    private snackBar: MatSnackBar,
    private snackbarSrv: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({ reason: '' });
    this.fundraiserId = this.data.fundraiserId;
  }

  report() {
    this.loading = true;
    let report: Report = {
      ...this.form.value,
      fundraiserId: this.fundraiserId,
    };
    this.reportSrv.report(report).subscribe(
      () => {
        this.loading = false;
        this.snackBar.open(
          'Report succesfull',
          'close',
          this.snackbarSrv.getConfig()
        );
        this.dilogRef.close();
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.snackBar.open(
          'Report failed',
          'close',
          this.snackbarSrv.getConfig()
        );
        this.errorMessage = error.error;
      }
    );
  }
  ngOnDestroy(): void {
    this.reportSub?.unsubscribe();
  }
}

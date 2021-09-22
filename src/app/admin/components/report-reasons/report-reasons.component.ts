import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { ReportReasonTypeService } from '../../services/report-reason-types/report-reason-types.service';
import { ReportReasonType } from './../../models/report-reason-type.model';

@Component({
  selector: 'app-report-reasons',
  templateUrl: './report-reasons.component.html',
  styleUrls: ['./report-reasons.component.scss']
})
export class ReportReasonsComponent implements OnInit {
  isFormEditMode = false; // to know if the form is in edit mode or not
  errorMessage = '';
  loading = false;

  reasons: ReportReasonType[] = [];

  reportReasonTypeToBeEdited?: ReportReasonType;

  reportReasonTypeSubscription?: Subscription;

  form!: FormGroup;
  isFormOpen: boolean=false;
  reasonTypes: ReportReasonType[]=[];

  constructor(
    private reportReasonTypeService: ReportReasonTypeService,
    private snackBar: MatSnackBar,
    private snackBarService: SnackbarService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getReportReasonTypes();
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.required]],
    });
  }

  getReportReasonTypes() {
    this.loading = true;
    this.reportReasonTypeSubscription = this.reportReasonTypeService.getReportReasonTypes().subscribe(
      (reasons:ReportReasonType[]) => {
        this.loading = false;
        this.reasonTypes = reasons;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        console.log(error.error);
        this.errorMessage=error.error
        this.snackBar.open(
          'unable to get reason types',
          'Close',
          this.snackBarService.getConfig()
        );
      }
    );
  }

  createReportReasonType() {
    this.form.patchValue({ name: this.form.get('name')?.value.trim() });
    if (this.form.valid) {
      this.reportReasonTypeSubscription = this.reportReasonTypeService
        .createReportReasonType(this.form.value as ReportReasonType)
        .subscribe(
          (cat: ReportReasonType) => {
            this.toggleForm();
            this.reasons.unshift(cat);
            this.snackBar.open(
              'ReportReasonType added successfully',
              'Close',
              this.snackBarService.getConfig()
            );
          },
          (error: HttpErrorResponse) => {
            console.log(error.error);
          this.errorMessage=error.error
            this.snackBar.open(
              'Unable to add reportReasonType',
              'Close',
              this.snackBarService.getConfig()
            );
          }
        );
    }
  }

  editReportReasonType(reportReasonType: ReportReasonType) {
    reportReasonType.name=this.name?.value;
    this.reportReasonTypeSubscription = this.reportReasonTypeService
      .updateReportReasonType(reportReasonType._id!, {name:reportReasonType.name})
      .subscribe(
        (cat: ReportReasonType) => {
          this.reportReasonTypeToBeEdited = undefined;
          this.isFormEditMode = false;
          this.cleanForm();
          console.log(cat);
          this.snackBar.open(
            'ReportReasonType updated successfully',
            'Close',
            this.snackBarService.getConfig()
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.errorMessage=error.error
          this.snackBar.open(
            'Unable to update reportReasonType',
            'Close',
            this.snackBarService.getConfig()
          );
        }
      );
  }

  deleteReportReasonType(reportReasonType: ReportReasonType) {
    let index = this.reasons.indexOf(reportReasonType);
    this.reasons.splice(index, 1);
    this.reportReasonTypeSubscription = this.reportReasonTypeService
      .deleteReportReasonType(reportReasonType._id!)
      .subscribe(
        () => {
          this.snackBar.open(
            'ReportReasonType deleted',
            'Close',
            this.snackBarService.getConfig()
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.errorMessage=error.error
          this.reasons.splice(index, 0, reportReasonType);
          this.snackBar.open(
            'Unable to delete reportReasonType',
            'Close',
            this.snackBarService.getConfig()
          );
        }
      );
  }

  // make form edit mode
  editMode(reportReasonType: ReportReasonType) {
    this.isFormOpen=true;
    this.isFormEditMode = true;
    this.reportReasonTypeToBeEdited = reportReasonType;
    this.form.patchValue(reportReasonType);
    console.log(this.reportReasonTypeToBeEdited);
    console.log(reportReasonType); 
  }

  // clean the form when it is closed
  cleanForm(){
    this.name?.setValue(undefined);
          this.name!.setErrors(null);
  }

  // toggle the form open and closed status
  toggleForm(){
    this.isFormOpen=!this.isFormOpen;
    this.isFormEditMode = false;
    this.reportReasonTypeToBeEdited = undefined;
    this.cleanForm();
  }

  // getters for form controls
  public get name(): AbstractControl | null {
    return this.form.get('name');
  }
}


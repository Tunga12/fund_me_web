import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { CategoryService } from './../../../services/category/category.service';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  @Input()
  fundraiser!: Fundraiser;

  categories!: Category[];
  categorySub?: Subscription;

  fundraiserSub?: Subscription;
  loading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private fundraiserService: FundraiserService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private snackbar: MatSnackBar,
    private docTitle: Title
  ) {}

  ngOnInit(): void {
    this.docTitle.setTitle('Edit overview');
    this.form = this.formBuilder.group({
      title: [, [Validators.required, Validators.minLength(5)]],
      category: [undefined, [Validators.required]],
      goalAmount: [undefined, [Validators.required, Validators.min(50)]],
    });
    this.getCategories();
    this.form.patchValue(this.fundraiser);
  }

  // post edit
  editFundraiser() {
    this.loading = true;
    this.fundraiserSub = this.fundraiserService
      .editFundraiser(this.fundraiser)
      .subscribe(
        (fundraiser) => {
          this.fundraiser = fundraiser;
          this.loading = false;
          this.snackbar.open(
            'Edit completed sccessfly',
            'close',
            this.snackbarService.getConfig()
          );
        },
        (error) => {
          this.loading = false;
          this.snackbar.open(
            error.error,
            'close',
            this.snackbarService.getConfig()
          );
          console.log(error.error);
          this.errorMessage = error.error;
        }
      );
  }

  get goalAmount(): AbstractControl | null {
    return this.form.get('goalAmount');
  }

  get category(): AbstractControl | null {
    return this.form.get('category');
  }

  public get title(): AbstractControl | null {
    return this.form.get('title');
  }

  // get categories
  getCategories() {
    this.categorySub = this.categoryService
      .getCategories()
      .subscribe((categoryList: Category[]) => {
        this.categories = categoryList;
      });
  }

  // open delete connfirmation dialog
  openDeleteDialog() {
    this.dialog.open(DeleteDialogComponent, { data: this.fundraiser });
  }

  ngOnDestroy(): void {
    this.categorySub?.unsubscribe();
    this.fundraiserSub?.unsubscribe();
  }
}

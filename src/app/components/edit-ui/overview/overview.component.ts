import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { CategoryService } from './../../../services/category/category.service';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private fundraiserService: FundraiserService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [],
      goal: [],
      category: [],
    });
    this.getCategories();
  }

  // post edit
  editFundraiser() {
    this.fundraiserSub = this.fundraiserService
      .editFundraiser(this.fundraiser)
      .subscribe((fundraiser) => (this.fundraiser = fundraiser));
  }

  // get categories
  getCategories() {
    this.categorySub = this.categoryService
      .getCategories()
      .subscribe((categoryList: Category[]) => {
        this.categories = categoryList;
      });
  }

  // delete current fundraiser
  deleteFundraiser() {
    let fundId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fundraiserSub = this.fundraiserService
      .deleteFundraiser(this.fundraiser._id ?? fundId ?? '')
      .subscribe(
        (message) => {
          console.log(message);
          this.dialogRef.close();
          this.router.navigateByUrl(
            `/my-fundraisers/${this.fundraiser.organizer?._id}`
          );
        },
        (err) => {
          console.log('error occured');
          this.router.navigateByUrl(
            `/my-fundraisers/${this.fundraiser.organizer?._id}`
          );
          this.dialogRef.close();
        }
      );
  }

  // open delete connfirmation dialog
  openDeleteDialog() {
    this.dialog.open(DeleteDialogComponent);
  }

  ngOnDestroy(): void {
    this.categorySub?.unsubscribe();
    this.fundraiserSub?.unsubscribe();
  }
}

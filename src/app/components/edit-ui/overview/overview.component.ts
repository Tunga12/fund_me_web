import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { CategoryService } from './../../../services/category/category.service';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

    private dialog: MatDialog
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

  // open delete connfirmation dialog
  openDeleteDialog() {
    this.dialog.open(DeleteDialogComponent, { data: this.fundraiser });
  }

  ngOnDestroy(): void {
    if (this.categorySub) this.categorySub.unsubscribe();
  }
}

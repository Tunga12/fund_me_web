import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  isFormEditMode = false; // to know if the form is in edit mode or not
  errorMessage = '';
  loading = false;

  categories: Category[] = [];

  categoryToBeEdited?: Category;

  categorySubscription?: Subscription;

  form!: FormGroup;
  isFormOpen: boolean=false;

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private snackBarService: SnackbarService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.required]],
    });
  }

  getCategories() {
    this.loading = true;
    this.categorySubscription = this.categoryService.getCategories().subscribe(
      (categories) => {
        this.loading = false;
        this.categories = categories;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        console.log(error.error);
        this.errorMessage=error.error
        this.snackBar.open(
          'unable to get categories',
          'Close',
          this.snackBarService.getConfig()
        );
      }
    );
  }

  createCategory() {
    this.form.patchValue({ name: this.form.get('name')?.value.trim() });
    if (this.form.valid) {
      this.categorySubscription = this.categoryService
        .createCategory(this.form.value as Category)
        .subscribe(
          (cat: Category) => {
            this.toggleForm();
            this.categories.unshift(cat);
            this.snackBar.open(
              'Category added successfully',
              'Close',
              this.snackBarService.getConfig()
            );
          },
          (error: HttpErrorResponse) => {
            console.log(error.error);
          this.errorMessage=error.error
            this.snackBar.open(
              'Unable to add category',
              'Close',
              this.snackBarService.getConfig()
            );
          }
        );
    }
  }

  editCategory(category: Category) {
    category.name=this.name?.value;
    this.categorySubscription = this.categoryService
      .updateCategory(category._id!, {name:category.name})
      .subscribe(
        (cat: Category) => {
          this.categoryToBeEdited = undefined;
          this.isFormEditMode = false;
          this.cleanForm();
          console.log(cat);
          this.snackBar.open(
            'Category updated successfully',
            'Close',
            this.snackBarService.getConfig()
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.errorMessage=error.error
          this.snackBar.open(
            'Unable to update category',
            'Close',
            this.snackBarService.getConfig()
          );
        }
      );
  }

  deleteCategory(category: Category) {
    let index = this.categories.indexOf(category);
    this.categories.splice(index, 1);
    this.categorySubscription = this.categoryService
      .deleteCategory(category._id!)
      .subscribe(
        () => {
          this.snackBar.open(
            'Category deleted',
            'Close',
            this.snackBarService.getConfig()
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.errorMessage=error.error
          this.categories.splice(index, 0, category);
          this.snackBar.open(
            'Unable to delete category',
            'Close',
            this.snackBarService.getConfig()
          );
        }
      );
  }

  // make form edit mode
  editMode(category: Category) {
    this.isFormEditMode = true;
    this.categoryToBeEdited = category;
    this.form.patchValue(category);
    console.log(this.categoryToBeEdited);
    console.log(category); 
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
    this.categoryToBeEdited = undefined;
    this.cleanForm();
  }

  // getters for form controls
  public get name(): AbstractControl | null {
    return this.form.get('name');
  }
}

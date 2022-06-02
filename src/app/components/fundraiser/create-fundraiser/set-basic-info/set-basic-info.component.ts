import { Output, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'set-basic-info',
  templateUrl: './set-basic-info.component.html',
  styleUrls: ['./set-basic-info.component.scss'],
})
export class SetBasicInfoComponent implements OnInit, OnDestroy {
  selected_category!: Category;
  @Input() fundraiser!: Fundraiser;
  form!: FormGroup;
  @Output() next = new EventEmitter();
  categories!: Category[];
  categorySub?: Subscription;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      category: [undefined, [Validators.required]],
      goalAmount: [undefined, [Validators.required, Validators.min(1)]],
    });
    this.getCategories();

    this.form.patchValue(this.fundraiser);
    this.selected_category = this.fundraiser.category!;
  }

  // get categories
  getCategories() {
    this.categorySub = this.categoryService
      .getCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  // compare two objects
  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.name === o2.name && o1.id === o2.id;
    }
    return false;
  }

  // go to the next form

  nextStep() {
    this.fundraiser = { ...this.fundraiser, ...this.form.value };
    this.next.emit(this.fundraiser);
  }

  // getters for form controls
  get goalAmount(): AbstractControl | null {
    return this.form.get('goalAmount');
  }
  get category(): AbstractControl | null {
    return this.form.get('category');
  }

  ngOnDestroy(): void {
    this.categorySub?.unsubscribe();
  }
}

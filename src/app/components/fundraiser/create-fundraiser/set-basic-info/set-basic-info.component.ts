import { Output, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'set-basic-info',
  templateUrl: './set-basic-info.component.html',
  styleUrls: ['./set-basic-info.component.css'],
})
export class SetBasicInfoComponent implements OnInit, OnDestroy {
  @Input()
  fundraiser!: Fundraiser;
  @Input() form!: FormGroup;
  @Output() next = new EventEmitter();

  categories!: Category[];
  categorySub?: Subscription;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  // get categories
  getCategories() {
    this.categorySub = this.categoryService
      .getCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  nextStep() {
    this.next.emit(this.fundraiser);
  }

  ngOnDestroy(): void {
    if (this.categorySub) this.categorySub.unsubscribe();
  }
}

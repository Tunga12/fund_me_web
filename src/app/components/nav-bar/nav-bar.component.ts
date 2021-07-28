import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from './../../services/category/category.service';
import { Category } from 'src/app/models/category.model';
import {  Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  // the following 3 fields are
  //to toggle the carets upward and downward based on
  // the close and open state of dropdowns
  discoverCaret = true;
  fundriseCaret = true;
  accountCaret = true;

  // list of all categories
  categories: Category[] = [];

  // subscription to unsubscribe on destroy of this component
  categorySub?: Subscription;

  currentUser?: User; //currently loggedd in user
  currentUserSub?: Subscription;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getCurrentUser();
  }

  // get all categories from the service and assign to our list 'categories'
  getCategories() {
    this.categorySub = this.categoryService
      .getCategories()
      .subscribe((categoryList) => {
        this.categories = categoryList;
      });
  }

  // get the currently logged in user
  getCurrentUser() {
    this.currentUserSub = this.userService
      .getCurrentUser()
      .subscribe((user) => {
        this.currentUser = user;
      });
  }

  ngOnDestroy(): void {
    if (this.currentUserSub) this.currentUserSub.unsubscribe();
    if (this.categorySub) this.categorySub.unsubscribe();
  }
}

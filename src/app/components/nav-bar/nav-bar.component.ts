import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

import { AuthService } from './../../services/auth/auth.service';
import { CategoryService } from './../../services/category/category.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
    // selected language
    selectedLanguage?: string;
  // the following 3 fields are
  //to toggle the carets upward and downward based on
  // the close and open state of dropdowns
  discoverCaret = true;
  fundraiseCaret = true;
  accountCaret = true;

  searchword = '';
  // list of all categories
  categories: Category[] = [];

  // subscription to unsubscribe on destroy of this component
  categorySub?: Subscription;

  currentUser?: User; //currently loggedd in user
  currentUserSub?: Subscription;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router,
    public authService: AuthService,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('lang') || 'en');
  }
  ngOnInit(): void {
        // get the selected language
        this.selectedLanguage = localStorage.getItem('lang') || 'en';

    // this.getCategories();
    if (this.authService.isLoggedIn()) {
      this.getCurrentUser();
    }
  }

  search(keyword: string) {
    this.router.navigate(['/s'], { queryParams: { q: keyword } });
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
        localStorage.setItem('userId', this.currentUser?._id || '');
      });
  }

  changeLang(event: any) {
    let lang = event.value;
    this.selectedLanguage = lang;
    console.log(this.selectedLanguage);
    localStorage.setItem('lang', lang);
    location.reload();
  }

  ngOnDestroy(): void {
    if (this.currentUserSub) this.currentUserSub.unsubscribe();
    if (this.categorySub) this.categorySub.unsubscribe();
  }
}

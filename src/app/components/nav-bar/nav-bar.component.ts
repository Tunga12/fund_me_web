import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  accountCaret = true; //to toggle the carets upward and downward based on

  searchWord = '';
  // list of all categories
  categories: Category[] = [];

  // subscription to unsubscribe on destroy of this component
  categorySub?: Subscription;

  currentUser?: User; //currently logged in user
  currentUserSub?: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    public authService: AuthService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('lang') || 'en');
  }
  ngOnInit(): void {
    this.currentUser=JSON.parse(localStorage.getItem('user')||'{}');
    console.log(this.currentUser);
    
    // this.getCategories();
    if (!this.currentUser?.firstName || !this.currentUser?.lastName) {
      this.getCurrentUser();
    }

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.searchWord = params['q'];
      console.log(this.searchWord);
    });
  }

  search(keyword: string) {
    this.router.navigate(['/s'], { queryParams: { q: keyword } });
  }


  // get the currently logged in user
  getCurrentUser() {
    this.currentUserSub = this.userService
      .getCurrentUser()
      .subscribe((user) => {
        let newUser:User={firstName:user.firstName,lastName:user.lastName,email:user.email}
        localStorage.setItem('user',JSON.stringify(newUser))
        this.currentUser = user;
        localStorage.setItem('userId', this.currentUser?._id || '');
      });
  }

  ngOnDestroy(): void {
    if (this.currentUserSub) this.currentUserSub.unsubscribe();
    if (this.categorySub) this.categorySub.unsubscribe();
  }
}

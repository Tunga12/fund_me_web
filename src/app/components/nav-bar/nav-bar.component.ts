import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

import { AuthService } from './../../services/auth/auth.service';
import { SocketIoService } from 'src/app/services/socket.io/socket.io.service';

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

  unreadCount = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    public authService: AuthService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private socketIoService: SocketIoService,
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('lang') || 'en');
  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.currentUser);

    // this.getCategories();
    // if (!this.currentUser?.firstName || !this.currentUser?.lastName) {
    //   if(localStorage.getItem('userId')){
    //     this.getCurrentUser();
    //   }
    // }

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.searchWord = params['q'];
      console.log(this.searchWord);
    });

    this.socketIoService.listen('Connected').subscribe((data: any) => {
      console.log(`connected: ${data}`);
    });

    // this.socketIoService.getUnreadCount();

    // getting notification count
    this.socketIoService
      .unreadNotificationCount()
      .subscribe((unreadCount: any) => {
        console.log(`unread count: ${unreadCount}`);
        this.unreadCount = unreadCount;
      });
  }

  search(keyword: string) {
    if (keyword.trim())
      this.router.navigate(['/s'], { queryParams: { q: keyword } });
  }

  // get the currently logged in user
  getCurrentUser() {
    this.currentUserSub = this.userService
      .getCurrentUser()
      .subscribe((user) => {
        let newUser: User = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
        localStorage.setItem('user', JSON.stringify(newUser));
        this.currentUser = user;
        localStorage.setItem('userId', this.currentUser?._id || '');
      });
  }

  routeContains(text: string) {
    // console.log(this.router.url)
    let result = this.router.url.includes(text);
    // console.log(text, result)
    return result;
  }

  ngOnDestroy(): void {
    if (this.currentUserSub) this.currentUserSub.unsubscribe();
    if (this.categorySub) this.categorySub.unsubscribe();
  }
}

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'admin-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  mobileQuery:MediaQueryList;
  private _mobileQueryListener:()=>void;
  accountCaret=true;
  currentUser?: User; //currently loggedd in user
  currentUserSub?: Subscription;
  icons_only=false;
  constructor(
    private userService: UserService,
    public authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit(): void {
      this.getCurrentUser();
  }

   // get the currently logged in user
   getCurrentUser() {
    this.currentUserSub = this.userService
      .getCurrentUser()
      .subscribe((user) => {
        this.currentUser = user;
        localStorage.setItem('userId', this.currentUser?._id || '');
        // sessionStorage.setItem('user',this.currentUser);
        console.log(this.currentUser);
      });
  }

  ngOnDestroy(): void {
    if (this.currentUserSub) this.currentUserSub.unsubscribe();
  }
}

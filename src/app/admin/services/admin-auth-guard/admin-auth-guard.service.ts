import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate, OnInit, OnDestroy {
  user?: User;
  userSub?: Subscription;
  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userSub = this.userService.getCurrentUser().subscribe(
      user => this.user = user
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log(this.user);
    if (this.user?.isAdmin) {
      return true;
    }
    this.router.navigate(['/sign-in']);
    return false;
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
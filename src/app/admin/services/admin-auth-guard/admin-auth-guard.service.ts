import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

import { AdminUsersService } from '../admin-users/admin-users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  user?: User;
  constructor
    (
      private router: Router,
      private adminUserService: AdminUsersService,
  ) {

  }




  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.adminUserService.getCurrentUser()
      .then(
        (user: User) => {
          this.user = user!
        }
      );

    if (this.user) {
      return true;
    }
    this.router.navigate(['/sign-in']);
    return false;
  }
}
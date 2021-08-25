import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { AdminUsersService } from '../admin-users/admin-users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  user?: User;
  constructor(
    private userService: AdminUsersService,
    private router: Router
  ) {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    await this.userService.getCurrentUser().then(
      (user) => {
        this.user = user;
      }
    );

    return new Promise(
      (resolve, reject) => {
        if (this.user?.isAdmin) {
          resolve(true);
          console.log('admin');
        }
        else{
        this.router.navigate(['/sign-in']);
        resolve(false);
      }
    }

    );


  }
}
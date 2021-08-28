import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Fundraiser } from 'src/app/models/fundraiser.model';

import { FundraiserService } from '../../fundraiser/fundraiser.service';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanActivate {
  userId: string;
  fundId: string;
  fundraiser!: Fundraiser;

  constructor(private fundraiserService: FundraiserService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.userId = localStorage.getItem('userId') || '';
    this.fundId = activatedRoute.snapshot.paramMap.get('fundraiserId') || '';
    this.getFundraiser();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.fundraiser.organizer?._id === this.userId) {
      return true;
    }
    // this.router.navigate(['/sign-in']);
    return false;
  }

  async getFundraiser(){
    await this.fundraiserService.getFundraiser(this.fundId).toPromise()
      .then((fund) => {
        this.fundraiser = fund;
      }
      )
  }
}



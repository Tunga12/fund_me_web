import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from '../../fundraiser/fundraiser.service';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanActivate, OnDestroy {
  userId: string;
  fundId: string;
  fundraiser!: Fundraiser;
  fundSub?: Subscription;
  constructor(private fundraiserService: FundraiserService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.userId = localStorage.getItem('userId') || '';
    this.fundId = activatedRoute.snapshot.paramMap.get('fundraiserId') || '';
    this.getFundraiser();
  }
  ngOnDestroy(): void {
    this.fundSub?.unsubscribe()
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.fundraiser.organizer?._id === this.userId) {
      return true;
    }
    this.router.navigate(['/sign-in']);
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



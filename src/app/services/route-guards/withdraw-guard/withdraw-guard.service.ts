import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from '../../fundraiser/fundraiser.service';

@Injectable({
  providedIn: 'root'
})
export class WithdrawGuard implements CanActivate, OnDestroy, OnInit {
  userId?: string;
  fundId?: string;
  fundraiser!: Fundraiser;
  fundSub?: Subscription;
  constructor(private fundraiserService: FundraiserService, private activatedRoute: ActivatedRoute, private router: Router) {
   
  }
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    this.fundId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.fundSub = this.fundraiserService.getFundraiser(this.fundId)
      .subscribe((fund) => {
        this.fundraiser = fund;
      }
      )
  }

  ngOnDestroy(): void {
    this.fundSub?.unsubscribe()
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  // withdraw component should only be activated by organizer and beneficiaryof the campign
    if ((this.fundraiser?.organizer?._id === this.userId) || (this.fundraiser?.beneficiary?._id === this.userId)) {      
      return true;
    }
    this.router.navigate(['/sign-in']);
    return false;
  }
}



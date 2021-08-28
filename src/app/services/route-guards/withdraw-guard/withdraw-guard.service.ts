import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from '../../fundraiser/fundraiser.service';

@Injectable({
  providedIn: 'root'
})
export class WithdrawGuard implements CanActivate, OnDestroy {
  userId?: string;
  fundId?: string;
  fundraiser!: Fundraiser;
  fundSub?: Subscription;

  constructor(private fundraiserService: FundraiserService, private activatedRoute: ActivatedRoute, private router: Router) { 

  }

 
  ngOnDestroy(): void {
    this.fundSub?.unsubscribe()
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    this.userId = localStorage.getItem('userId') || '';
        
    this.activatedRoute.paramMap.subscribe(
      (map)=>{
        console.log(map);
        this.fundId=map.get('id')??"";
      }
    )
    // this.fundSub = this.fundraiserService.getFundraiser(this.fundId)
    //   .subscribe((fund) => {
    //     this.fundraiser = fund;
    //   }
    //   )
 // withdraw component should only be activated by organizer or beneficiaryof the campign
 return new Promise(
  (resolve, reject)=>{
 if (
   this.fundraiser?.organizer?._id === this.userId ||
   this.fundraiser?.beneficiary?._id === this.userId
 ) {
   resolve(true);
 }
 console.log('fid',this.fundId, 'uid',this.userId);
 resolve(false);
}
);
  }
}



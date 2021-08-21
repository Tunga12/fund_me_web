import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-withdrwal',
  templateUrl: './withdrwal.component.html',
  styleUrls: ['./withdrwal.component.css'],
})
export class WithdrwalComponent implements OnInit, OnDestroy {

  saving_type='';
  withdrawer='';
  fundId = '';//id of the fundraiser
  // subscriptions
  activatedRouteSub?: Subscription;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get the id of the fundraiser
    this.activatedRouteSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.fundId = params.get('id') || '';
      console.log(this.fundId);
    });
  }


  openNextForm() {
    if (this.withdrawer === 'me') {
      this.router.navigate(['/withdrawal/personal-info',this.fundId]);
    }
    else {
      this.router.navigate(['/withdrawal/beneficiary-form', this.fundId])
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSub?.unsubscribe()
  }

}




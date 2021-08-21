import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit, OnDestroy {

  fundId = '';
  activatedRouteSub?: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // get the id of the fundraiser
    this.activatedRouteSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.fundId = params.get('id') || '';
      // console.log(this.fundId);
    });
  }

  ngOnDestroy(): void {
    this.activatedRouteSub?.unsubscribe();
  }

}
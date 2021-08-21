import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserPage } from 'src/app/models/fundraiser-page.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-public-fund-list',
  templateUrl: './public-fund-list.component.html',
  styleUrls: ['./public-fund-list.component.css']
})
export class PublicFundListComponent {
  @Input() fundraisers!:Fundraiser[];
  @Input() hasNext!:boolean;
  @Output() nextEvent=new EventEmitter();
  constructor(
    private fundraiserService: FundraiserService,
    public authService: AuthService
  ) {}
  
  percentage(fund: Fundraiser): number {
    return this.fundraiserService.getPercentage(fund);
  }

  nextPage(){
    this.nextEvent.emit();
  }
}

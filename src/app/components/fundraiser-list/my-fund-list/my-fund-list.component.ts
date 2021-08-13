import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'my-fund-list',
  templateUrl: './my-fund-list.component.html',
  styleUrls: ['./my-fund-list.component.css']
})
export class MyFundListComponent{
  @Input() fundraisers!: Fundraiser[];
  constructor() {}
}

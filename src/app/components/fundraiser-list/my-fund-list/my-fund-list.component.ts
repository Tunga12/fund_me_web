import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'my-fund-list',
  templateUrl: './my-fund-list.component.html',
  styleUrls: ['./my-fund-list.component.scss']
})
export class MyFundListComponent{
  @Input() fundraisers!: Fundraiser[];
  @Input() hasNext!: boolean;
  @Input() loading!: boolean;
  @Output() nextEvent=new EventEmitter();
  constructor() {}

  nextPage(){
    this.nextEvent.emit();
  }
}

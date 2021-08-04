import { Component, Input, OnInit } from '@angular/core';
import { Fundraiser } from './../../../../models/fundraiser.model';

@Component({
  selector: 'donors-tab-conntent',
  templateUrl: './donors-tab-conntent.component.html',
  styleUrls: ['./donors-tab-conntent.component.css']
})
export class DonorsTabConntentComponent implements OnInit {

  @Input() fundraiser!: Fundraiser;
  constructor() { }

  ngOnInit(): void {
  }

}

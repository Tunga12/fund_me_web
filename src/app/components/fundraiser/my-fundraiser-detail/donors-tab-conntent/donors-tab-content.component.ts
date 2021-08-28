import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Fundraiser } from '../../../../models/fundraiser.model';

@Component({
  selector: 'app-donors-tab-content',
  templateUrl: './donors-tab-content.component.html',
  styleUrls: ['./donors-tab-content.component.css'],
})
export class DonorsTabConntentComponent {
  @Input() fundraiser!: Fundraiser;
  constructor() {}

  
}

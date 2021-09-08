import { Component, Input, OnInit } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'app-updates-section',
  templateUrl: './updates-section.component.html',
  styleUrls: ['./updates-section.component.css']
})
export class UpdatesSectionComponent implements OnInit {
  @Input() fundraiser!:Fundraiser;
  constructor() { }

  ngOnInit(): void {
  }

}

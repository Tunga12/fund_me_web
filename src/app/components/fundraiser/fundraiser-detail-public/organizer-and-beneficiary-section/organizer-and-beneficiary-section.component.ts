import { Component, Input, OnInit } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'app-organizer-and-beneficiary-section',
  templateUrl: './organizer-and-beneficiary-section.component.html',
  styleUrls: ['./organizer-and-beneficiary-section.component.css']
})
export class OrganizerAndBeneficiarySectionComponent implements OnInit {
  @Input() fundraiser!: Fundraiser;
  constructor(
  ) { }

  ngOnInit(): void {
  }

}

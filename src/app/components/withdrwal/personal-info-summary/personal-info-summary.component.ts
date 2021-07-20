import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-info-summary',
  templateUrl: './personal-info-summary.component.html',
  styleUrls: ['./personal-info-summary.component.css'],
})
export class PersonalInfoSummaryComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  editInfo() {
    this.router.navigateByUrl('/withdrawal/personal-info');
  }
}

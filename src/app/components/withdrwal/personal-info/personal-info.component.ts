import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
})
export class PersonalInfoComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}
  goBack() {
    this.activatedRoute.params.subscribe((param) => console.log(param));
    this.router.navigateByUrl('/withdrawal');
  }
  goToPersonalInfoSummary() {
    this.router.navigateByUrl('/withdrawal/personal-info-summary');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-fundraiser-goal',
  templateUrl: './set-fundraiser-goal.component.html',
  styleUrls: ['./set-fundraiser-goal.component.css'],
})
export class SetFundraiserGoalComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  next() {
    this.router.navigate(['/create/set-fundraiser-media']);
  }
}

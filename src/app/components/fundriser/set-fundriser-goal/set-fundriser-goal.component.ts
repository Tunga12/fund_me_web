import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-fundriser-goal',
  templateUrl: './set-fundriser-goal.component.html',
  styleUrls: ['./set-fundriser-goal.component.css']
})
export class SetFundriserGoalComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  next() {
    this.router.navigate(["/set-fundriser-media"]);
  }
}

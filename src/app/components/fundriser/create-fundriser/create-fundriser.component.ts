import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector:'create-fundriser',
  templateUrl: './create-fundriser.component.html',
  styleUrls: ['./create-fundriser.component.css']
})
export class CreateFundriserComponent implements OnInit {
  selected = "";
  step = 1;
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  next() {
    this.router.navigate(["/set-fundriser-goal"]);
  }

}

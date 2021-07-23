import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fundriser-list',
  templateUrl: './fundriser-list.component.html',
  styleUrls: ['./fundriser-list.component.css'],
})
export class FundriserListComponent implements OnInit {
  constructor( private router:Router) {}

  ngOnInit(): void {}
  manageFundriser() {
    this.router.navigateByUrl('/my-fundriser-detail')
  }

  createFundriser() {
    this.router.navigateByUrl('/create');
  }
}

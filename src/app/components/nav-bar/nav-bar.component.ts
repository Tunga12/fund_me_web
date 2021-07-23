import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  discoverCaret = true;
  fundriseCaret = true;
  accountCaret = true;
  constructor(private router:Router) {}

  ngOnInit(): void {}

  toggleAccountCaret() {
    this.accountCaret = !this.accountCaret;
  }

  toggleFundriseCaret() {
    this.fundriseCaret = !this.fundriseCaret;
  }
  toggleDiscoverCaret() {
    this.discoverCaret = !this.discoverCaret;
  }

  canceled() {
    console.log('Cancel');
  }
  myFundrisers() {
    this.router.navigateByUrl('/my-fundrisers');
  }
  newFundriser() {
    this.router.navigateByUrl('/create');
  }
}

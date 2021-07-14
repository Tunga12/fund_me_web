import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  discoverCaret = true;
  fundriseCaret = true;
  constructor() {}

  ngOnInit(): void {}
  toggleFundriseCaret() {
    this.fundriseCaret = !this.fundriseCaret;
    // console.log(this.fundriseCaret);
  }
  toggleDiscoverCaret() {
    this.discoverCaret = !this.discoverCaret;
    // console.log(this.discoverCaret);
  }

  canceled() {
    console.log('Cancel');
  }
}

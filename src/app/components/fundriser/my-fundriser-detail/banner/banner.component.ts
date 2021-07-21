import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  show_facebook_banner = true;
  constructor() { }

  ngOnInit(): void {
  }
  toggleBanner() {
    this.show_facebook_banner = !this.show_facebook_banner;
  }

}

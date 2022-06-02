import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Legas';
  no_footer_pages = [
    '/account',
    '/create',
    '/admin',
    '/notification',
    '/sign',
    '/404',
  ];

  no_navbar_pages = ['/admin'];
  hide_footer = false;
  hide_navbar = false;

  constructor(private router: Router) {
    const navEndEvents = router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );
    navEndEvents.subscribe((event) => {
      this.hide_footer = false;
      let url = (event as NavigationEnd).url;
      this.no_footer_pages.forEach((_page) => {
        if (url.startsWith(_page)) {
          this.hide_footer = true;
          return;
        }
      });
    });

    navEndEvents.subscribe((event) => {
      this.hide_navbar = false;
      let url = (event as NavigationEnd).url;
      this.no_navbar_pages.forEach((_page) => {
        if (url.startsWith(_page)) {
          this.hide_navbar = true;
          return;
        }
      });
    });
  }
}

import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'go-fund-me';
  no_footer_pages = ['/account', '/create', '/admin', '/notification', '/sign','/404'];

  hide_footer = false;

  constructor(private router: Router) {
    const navEndEvents = router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );
    navEndEvents.subscribe((event) => {
      this.hide_footer=false;
      let url = (event as NavigationEnd).url;
      this.no_footer_pages.forEach(_page=>{
        if (url.startsWith(_page)) {
          this.hide_footer=true;
          return;
        }
      })
    });
  }
}

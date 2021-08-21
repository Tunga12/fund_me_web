import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'go-fund-me';

  // // for google analytics
  // constructor(private router: Router){
  //   const navEndEvents=router.events.pipe(
  //     filter(event=> event instanceof NavigationEnd)
  //   );
  //   navEndEvents.subscribe((event)=>{
  //     console.log((event as NavigationEnd).url);
  //   });
  // }
}

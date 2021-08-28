import { Component, OnInit, OnDestroy } from '@angular/core';
import { Help } from 'src/app/models/help.model';
import { HelpService } from 'src/app/services/help/help.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
})
export class HelpComponent implements OnInit,OnDestroy {
  helps: Help[] = [];
  helpSub?:Subscription;
  constructor(private helpService: HelpService) {}

  ngOnInit(): void {
    this.helpSub=this.helpService.getHelps().subscribe((helps) => {
      this.helps = helps;
      console.log(helps);
    });
  }

  ngOnDestroy(): void {
    this.helpSub?.unsubscribe();
  
  }
}

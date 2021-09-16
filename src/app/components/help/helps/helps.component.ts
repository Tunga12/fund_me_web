import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Help } from 'src/app/models/help.model';
import { HelpService } from 'src/app/services/help/help.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-helps',
  templateUrl: './helps.component.html',
  styleUrls: ['./helps.component.scss']
})
export class HelpsComponent implements OnInit {
  helps:Help[]=[];
 helpSub?:Subscription;
 private _category='';
  constructor(private helpService: HelpService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params)=>{
        this._category=params.get('category')||'';
        this.helpSub=this.helpService.getHelpsByCategory(this._category!).subscribe((helps) => {
          this.helps = helps;
          console.log(helps);
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.helpSub?.unsubscribe();
  }
}

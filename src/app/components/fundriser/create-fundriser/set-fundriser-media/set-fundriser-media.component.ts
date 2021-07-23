import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-fundriser-media',
  templateUrl: './set-fundriser-media.component.html',
  styleUrls: ['./set-fundriser-media.component.css'],
})
export class SetFundriserMediaComponent implements OnInit {
  constructor(
    private router:Router
  ) {}

  ngOnInit(): void {}
  next() {
    this.router.navigateByUrl("/create/set-fundriser-story");
  }
  select(src: MouseEvent) {
    // console.log(src.focus);
    // src.focus();
    
    console.log(src);
  }
}

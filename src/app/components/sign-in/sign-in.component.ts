import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sign-in-page',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  hide = true;
  constructor() { }

  ngOnInit(): void {
  }

}

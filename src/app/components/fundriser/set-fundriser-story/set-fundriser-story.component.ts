import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-fundriser-story',
  templateUrl: './set-fundriser-story.component.html',
  styleUrls: ['./set-fundriser-story.component.css'],
})
export class SetFundriserStoryComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  next() {
    this.router.navigate(['/set-fundriser-media']);
  }
}

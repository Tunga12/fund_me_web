import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TopDoantionsComponent } from './../top-doantions/top-doantions.component';

@Component({
  selector: 'app-doantions',
  templateUrl: './doantions.component.html',
  styleUrls: ['./doantions.component.css'],
})
export class DoantionsComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

  // open top donations dialog
  topDonations() {
    this.dialog
      .open(TopDoantionsComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

  // open the donation form
  donate() {
    this.router.navigateByUrl('/donate');
  }
}

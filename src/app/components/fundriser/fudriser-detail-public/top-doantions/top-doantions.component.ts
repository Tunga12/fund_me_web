import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-doantions',
  templateUrl: './top-doantions.component.html',
  styleUrls: ['./top-doantions.component.css'],
})
export class TopDoantionsComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

  // open top donations dialog
  allDonations() {
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

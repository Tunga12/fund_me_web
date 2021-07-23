import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShareDialogComponent } from '../../share-dialog/share-dialog.component';
import { DoantionsComponent } from './doantions/doantions.component';
import { DonateComponent } from './../../donate/donate.component';

@Component({
  selector: 'app-fudriser-detail-public',
  templateUrl: './fudriser-detail-public.component.html',
  styleUrls: ['./fudriser-detail-public.component.css'],
})
export class FudriserDetailPublicComponent implements OnInit {
  story =
    'The campaign is set up by friends of the Weinberger family. The campaign has been approved and overseen by Rabbi Baruch Hertz, Rabbi Baruch Epstein, and Rabbi Meir Moscowitz of Chicago, IL and funds are managed by the overseeing beneficiary Rabbi Yosef Assayag of Rabbanut, a 501c3 organization. Funds will be used to cover all costs associated with funeral expenses, loss of income, and all other related expenses the family will incur in relation to this tragedy.';
  update_text =
    'I’ve notified his parents and they’re been overwhelmed with all the support. This money is going to be directly deposited into his account. Thank you to anyone that donated or shared this post. A special thank you to the Seattle community for coming together and keeping the family close ♥️';
  constructor(
    private router: Router, private dialog:MatDialog
  ) {}

  ngOnInit(): void { }

  share() {
    this.dialog
      .open(ShareDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

  // open all donations dialog
  allDonations() {
    this.dialog
      .open(DoantionsComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

  // open top donations dialog
  topDonations() {
    this.dialog
      .open(DonateComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }
  donate() {
    this.router.navigateByUrl('/donate')

}
}


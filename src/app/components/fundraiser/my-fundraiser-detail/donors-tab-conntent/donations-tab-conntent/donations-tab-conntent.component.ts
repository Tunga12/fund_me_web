import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from 'src/app/components/share-dialog/share-dialog.component';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { ShareArgs } from 'src/app/models/share-buttons-args';

@Component({
  selector: 'donations-tab-conntent',
  templateUrl: './donations-tab-conntent.component.html',
  styleUrls: ['./donations-tab-conntent.component.css'],
})
export class DonationsTabConntentComponent implements OnInit {
  @Input() fundraiser!: Fundraiser;
  userId = '';
  constructor
  (
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
  }
  openShareDialog() {
    let data: ShareArgs = {
      url: `http://localhost:4200/fundraiser-detail/${this.fundraiser?._id}?ref=${this.userId}`,
      image: this.fundraiser?.image,
      title: this.fundraiser?.title,
      description: `Hi, I havae created a fundraiser on gofundme ${this.fundraiser?.beneficiary ? 'to help' + this.fundraiser.beneficiary.firstName : ''} please signup and help me by donating and sharing it to your friends. thanks!`
    };
    this.dialog
      .open(ShareDialogComponent,
        {
          data: data
        }
      )
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from 'src/app/components/share-dialog/share-dialog.component';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { ShareArgs } from 'src/app/models/share-buttons-args';

@Component({
  selector: 'donations-tab-content',
  templateUrl: './donations-tab-content.component.html',
  styleUrls: ['./donations-tab-content.component.scss'],
})
export class DonationsTabContentComponent implements OnInit {
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
      url: `http://legasfund.com/fundraiser-detail/${this.fundraiser?._id}?ref=${this.userId}`,
      image: this.fundraiser?.image,
      title: this.fundraiser?.title,
      description: `Hi, I have created a fundraiser on Legas ${this.fundraiser?.beneficiary ? 'to help' + this.fundraiser.beneficiary.firstName : ''} please signup and help me by donating and sharing it to your friends. thanks!`
    };
    this.dialog
      .open(ShareDialogComponent,
        {
          data: data
        }
      )
  }

}

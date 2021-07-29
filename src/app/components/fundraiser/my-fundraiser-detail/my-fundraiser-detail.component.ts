import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from '../../shared/share-dialog/share-dialog.component';
import { PostAnUpdateComponent } from '../../post-an-update/post-an-update.component';
import { ActivatedRoute } from '@angular/router';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-detail',
  templateUrl: './my-fundraiser-detail.component.html',
  styleUrls: ['./my-fundraiser-detail.component.css'],
})
export class MyFundraiserDetailComponent implements OnInit {
  fundraiserId: string = '';
  fundraiser!: Fundraiser;
  tabs = [1, 2, 3];
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fundraiserServ: FundraiserService
  ) {}

  ngOnInit(): void {
    // get the id parameter from router
    this.fundraiserId = this.activatedRoute.snapshot.paramMap.get('id') ?? ''; 
    this.getFundriser();
  }

  // get fundriser using id
  getFundriser() {
    this.fundraiserServ
      .getFundraiser(this.fundraiserId)
      .subscribe((fundraiser) => {
        this.fundraiser = fundraiser;        
      });
  }

  openUpdateDialog() {
    this.dialog
      .open(PostAnUpdateComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => {
        console.log(close_result);
        // this.updates.push(close_result);
        // console.log(this.updates);
      });
  }
  openShareDialog() {
    this.dialog
      .open(ShareDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => {
        console.log(close_result);
        // this.updates.push(close_result);
        // console.log(this.updates);
      });
  }



  
}

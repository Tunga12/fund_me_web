import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostAnUpdateComponent } from 'src/app/components/post-an-update/post-an-update.component';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { UpdateService } from './../../../../services/update/update.service';
import { ActivatedRoute } from '@angular/router';
import { Update } from 'src/app/models/update.model';

@Component({
  selector: 'updates-tab-content',
  templateUrl: './updates-tab-content.component.html',
  styleUrls: ['./updates-tab-content.component.css'],
})
export class UpdatesTabContentComponent implements OnInit {
  fundraiserId = '';
  @Input() fundraiser!: Fundraiser;
  update!: Update;

  constructor(
    private dialog: MatDialog,
    private updateService: UpdateService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // get the id parameter from router
    this.fundraiserId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  // post update
  postUpdate() {
    this.updateService.addUpdateToFundraiser(this.fundraiserId, this.update).subscribe(
      update => {
        this.update = update;
        // console.log("fend",this.update);
        // console.log("b-end",update);
      }
    );
  }

  openUpdateDialog() {
    this.dialog
      .open(PostAnUpdateComponent,this.update)
      .afterClosed()
      .subscribe((close_result) => {
        this.update = { ...close_result };
        // console.log("update",this.update);
        // console.log("close result",close_result);
        this.postUpdate();
        this.fundraiser.updates?.push(this.update);
      });
  }
  
  deleteUpdate(update: any) {
    // let index = this.updates.indexOf(update);
    // this.updates.splice(index, 1);
  }
}

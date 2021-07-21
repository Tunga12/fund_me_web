import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from '../../share-dialog/share-dialog.component';
import { PostAnUpdateComponent } from '../../post-an-update/post-an-update.component';
import { AddTeamMembersDialogComponent } from '../../teams/add-team-members-dialog/add-team-members-dialog.component';

@Component({
  selector: 'app-detail',
  templateUrl: './my-fundriser-detail.component.html',
  styleUrls: ['./my-fundriser-detail.component.css'],
})
export class MyFundriserDetailComponent implements OnInit {
  tabs = [1, 2, 3];
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}
 

 
  
}

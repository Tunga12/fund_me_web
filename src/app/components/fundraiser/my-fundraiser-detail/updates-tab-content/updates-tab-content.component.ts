import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateService } from './../../../../services/update/update.service';
import { Subscription } from 'rxjs';
import { PostAnUpdateComponent } from 'src/app/components/post-an-update/post-an-update.component';
import { MatDialog } from '@angular/material/dialog';
import { Update } from './../../../../models/update.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'updates-tab-content',
  templateUrl: './updates-tab-content.component.html',
  styleUrls: ['./updates-tab-content.component.css'],
})
export class UpdatesTabContentComponent implements OnInit, OnDestroy {
  // fundraiserId = '';
  @Input() fundraiser!: Fundraiser;

  @Output() update = new EventEmitter();
  updateSub?: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private updateService: UpdateService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
  }

  //  opendialog for update
  openEditDialog(update: Update) {
    delete update._id;
    this.dialog.open(PostAnUpdateComponent, {
      data: { mode: 'Edit', update: update, },
    });
  }

  openUpdateDialog() {
    this.update.emit();
  }

  // delete an update from a fundraiser
  deleteUpdate(update: any) {
    this.snackBar
      .open('Do you want to delete this update', 'Delete')
      .onAction()
      .subscribe(() => {
        console.log('Deleteing...', update);
        this.updateSub = this.updateService.deleteUpdate(update).subscribe(
          () => {
            this.snackBar.open('Update deleted successfuly!');
            let index = this.fundraiser.updates?.indexOf(update);
            this.fundraiser.updates?.splice(index ?? -1, 1);
          },
          (error) => {
            console.log(error.error);
          }
        );
      });
  }

  ngOnDestroy() {
    this.updateSub?.unsubscribe();
  }
}

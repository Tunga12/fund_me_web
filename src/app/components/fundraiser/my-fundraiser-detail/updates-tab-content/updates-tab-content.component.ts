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
import { Title } from '@angular/platform-browser';
import { SnackbarService } from './../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'updates-tab-content',
  templateUrl: './updates-tab-content.component.html',
  styleUrls: ['./updates-tab-content.component.css'],
})
export class UpdatesTabContentComponent implements OnInit, OnDestroy {
  @Input() fundraiser!: Fundraiser;
  @Output() update = new EventEmitter();
  updateSub?: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private updateService: UpdateService,
    private dialog: MatDialog,
    private snackbarService:SnackbarService,
    private docTitle: Title
  ) {}

  ngOnInit(): void {
    this.docTitle.setTitle('Manage updates');
  }

  //  open dialog for update
  openEditDialog(update: Update) {
    this.dialog.open(PostAnUpdateComponent, {
      data: { mode: 'Edit', update: update, fundraiser: this.fundraiser },
    });
  }

  openUpdateDialog() {
    this.update.emit();
  }

  // delete an update from a fundraiser
  deleteUpdate(update: any) {
        this.updateSub = this.updateService.deleteUpdate(update).subscribe(
          () => {
            this.snackBar.open('Update deleted successfully!', 'Close',this.snackbarService.getConfig());
            let index = this.fundraiser.updates!.indexOf(update);
            this.fundraiser.updates?.splice(index, 1);
          },
          (error) => {
            console.log(error.error);
            this.snackBar.open(
              error.error,
              'Close',
              this.snackbarService.getConfig()
            );
          }
        );
  }

  ngOnDestroy() {
    this.updateSub?.unsubscribe();
  }
}

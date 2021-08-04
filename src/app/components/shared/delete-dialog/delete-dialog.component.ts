import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  @Input() message = '';
  @Output() deleteEvent = new EventEmitter();
  constructor(
    // private activatedRoute: ActivatedRoute,
    // private fundraiserService: FundraiserService,
    // private router: Router,
    // public dialogRef: MatDialogRef<DeleteDialogComponent>
  ) // @Inject(MAT_DIALOG_DATA) public data: Fundraiser
  {
    // console.log('constructor', this.data);
  }

  delete() {
    this.deleteEvent.emit();
  }
}

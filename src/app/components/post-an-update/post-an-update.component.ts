import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Update } from './../../models/update.model';
import { ImageService } from './../../services/image/image.service';
import { UpdateService } from 'src/app/services/update/update.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { base64ToFile } from 'ngx-image-cropper';
import { UpdateImageCropperComponent } from './update-image-cropper/update-image-cropper.component';

@Component({
  selector: 'app-post-an-update',
  templateUrl: './post-an-update.component.html',
  styleUrls: ['./post-an-update.component.css'],
})
export class PostAnUpdateComponent implements OnInit, OnDestroy {
  loading = false;
  update: Update = { content: '', image: '' };
  form!: FormGroup;
  errorMessage = '';
  mode = '';
  fundraiser!: Fundraiser;

  updateSub?: Subscription;

  constructor(
    private updateService: UpdateService,
    private dialogRef: MatDialogRef<PostAnUpdateComponent>,
    private snackbarService: SnackbarService,
    private snackBar: MatSnackBar,
    private imageCropperDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnDestroy(): void {
    this.updateSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      image: new FormControl(this.update.image),
    });

    console.log(this.data);
    this.update =
      this.data?.update !== undefined
        ? this.data?.update
        : { content: '', image: '' };
    this.mode = this.data.mode;
    // if the dialoge is in edit mode update the fields with available values
    this.mode === 'Edit' ? this.form.patchValue(this.update!) : '';
    this.fundraiser = this.data.fundraiser;
  }

  // post update
  postUpdate() {
    this.loading = true;
    this.update.content = this.form.controls['content'].value;
    if (this.update.image === '') {
      delete this.update.image;
    }
    this.updateService
      .addUpdateToFundraiser(this.fundraiser._id!, this.update)
      .subscribe(
        (update) => {
          this.loading = false;
          // update = update;
          this.fundraiser.updates?.unshift(update);
          console.log(update);
          this.dialogRef.close();
          this.snackBar.open(
            'Update added successfuly!',
            'Close',
            this.snackbarService.getConfig()
          );
        },
        (error) => {
          this.loading = false;
          console.log(error);
          this.snackBar.open(
            error.error,
            'Close',
            this.snackbarService.getConfig()
          );
        }
      );
  }

  // edit this update
  editUpdate(update: Update) {
    this.loading = true;
    let content = this.form.controls['content'].value;
    update.image = this.update.image;
    update.content = content;
    let newUpdate = update;
    let id = update._id;
    delete update._id; // _id is not allowed for submission

    this.updateSub = this.updateService.editUpdate(id!, update).subscribe(
      (response) => {
        this.loading = false;
        this.dialogRef.close();
        let index = this.fundraiser.updates?.indexOf(update);
        this.fundraiser.updates?.splice(index!, 1, newUpdate);
        this.snackBar.open(
          'Update edited successfully!',
          'Close',
          this.snackbarService.getConfig()
        );
      },
      (error) => {
        console.log(error.error);
        this.loading = false;

        this.snackBar.open(
          error.error,
          'Close',
          this.snackbarService.getConfig()
        );
      }
    );
  }

  onImageChoosen(event: any) {
    this.errorMessage = '';
    this.imageCropperDialog
      .open(UpdateImageCropperComponent, { data: { image: event,mode:this.mode } })
      .afterClosed()
      .subscribe((croppedImage: any) => {
        console.log(croppedImage);
        
        if (croppedImage) {
          this.update.image = croppedImage;
          console.log(croppedImage);
        }
      });
  }

  public get content(): AbstractControl | null {
    return this.form.get('content');
  }

  public get image(): AbstractControl | null {
    return this.form.get('image');
  }
}

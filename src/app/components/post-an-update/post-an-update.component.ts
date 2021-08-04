import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddPhotoVideoDialogComponent } from './add-photo-video-dialog/add-photo-video-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Update } from './../../models/update.model';
import { ImageService } from './../../services/image/image.service';
import { UpdateService } from 'src/app/services/update/update.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-an-update',
  templateUrl: './post-an-update.component.html',
  styleUrls: ['./post-an-update.component.css'],
})
export class PostAnUpdateComponent implements OnInit {
  loading = false;
  update: Update = { content: '', image: '' };
  form!: FormGroup;
  imageSrc = '';
  errorMessage = '';
  mode = '';
  updateSub?: Subscription;
  fundraiserId: any;

  constructor(
    private imageService: ImageService,
    private updateService: UpdateService,
    private dialogRef: MatDialogRef<PostAnUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });

    console.log(this.data);
    this.update =
      this.data?.update !== undefined
        ? this.data?.update
        : { content: '', image: '' };
    console.log(this.update);

    this.mode = this.data.mode;
    this.mode === 'Edit' ? this.form.patchValue(this.update!) : '';
    this.fundraiserId = this.data.fundId;
  }

  // upload the image chosen by the user
  uploadImage(event: any) {
    this.loading = true;
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    this.imageService.upload(formData).subscribe(
      (response) => {
        this.imageSrc = response;
        this.update.image = response;
        this.loading = false;
      },
      (error) => {
        console.log(error.error);
        this.errorMessage = error.error;
        this.loading = false;
      }
    );
  }

  // post update
  postUpdate() {
    delete this.update._id;
    this.updateService
      .addUpdateToFundraiser(this.fundraiserId, {
        ...this.update,
        ...this.form.value,
      })
      .subscribe(
        (update) => {
          // update = update;
          console.log(update);
          this.dialogRef.close();
          location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // edit this update
  editUpdate() {
    this.updateSub = this.updateService
      .editUpdate({ ...this.update, ...this.form.value })
      .subscribe(
        (response) => {
          console.log(response);
          this.dialogRef.close();
        },
        (error) => {
          console.log(error.error);
        }
      );
  }

  // openAddPhotoOrVedioDialog() {
  //   this.dialog
  //     .open(AddPhotoVideoDialogComponent)
  //     .afterClosed()
  //     .subscribe((close_result) => console.log(close_result));
  // }
}

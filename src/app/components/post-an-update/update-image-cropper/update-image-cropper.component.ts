import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-update-image-cropper',
  templateUrl: './update-image-cropper.component.html',
  styleUrls: ['./update-image-cropper.component.css'],
})
export class UpdateImageCropperComponent implements OnInit {
  loading: boolean = false;
  errorMessage: any;
  croppedImageFile!: File;
  mode='Add';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private imageService: ImageService,
    private dialogRef: MatDialogRef<UpdateImageCropperComponent>
  ) {}

  ngOnInit(): void {
    this.fileChangeEvent(this.data.image);
    this.mode=this.data.mode;
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  // coplete croping
  saveImage() {
    // this.dialogRef.close(this.croppedImage);
    this.loading=true;
    let file = base64ToFile(this.croppedImage);
    const formData: FormData = new FormData();
    formData.append('image', file);
    this.imageService.upload(formData).subscribe(
      (response) => {
        this.loading = false;
        this.dialogRef.close(response);
        console.log(response);
      },
      (error) => {
        console.log(error.error);
        this.errorMessage = error.error;
        this.loading = false;
      }
    );
  }

  // croper funcs
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(this.imageChangedEvent);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
    console.log('image loaded');
  }
  cropperReady() {
    // cropper ready
    console.log('croper ready');
  }
  loadImageFailed() {
    console.log('unable toload image');
  }
}

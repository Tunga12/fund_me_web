import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  base64ToFile,
  ImageCroppedEvent,
  ImageTransform,
} from 'ngx-image-cropper';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-update-image-cropper',
  templateUrl: './update-image-cropper.component.html',
  styleUrls: ['./update-image-cropper.component.scss'],
})
export class UpdateImageCropperComponent implements OnInit {
  loading: boolean = false;
  errorMessage: any;
  croppedImageFile!: File;
  mode = 'Add';

  canvasRotation = 0;
  scale: number = 1;
  transform: ImageTransform = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private imageService: ImageService,
    private dialogRef: MatDialogRef<UpdateImageCropperComponent>
  ) {}

  ngOnInit(): void {
    this.fileChangeEvent(this.data.image);
    this.mode = this.data.mode;
    this.loading=true;
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  // complete cropping
  saveImage() {
    this.loading = true;
    let file = base64ToFile(this.croppedImage);
    const formData: FormData = new FormData();
    formData.append('image', file);
    this.imageService.upload(formData).subscribe(
      (response) => {
        this.loading = false;
        this.dialogRef.close(response);
      },
      (error) => {
        console.log(error.error);
        this.errorMessage = error.error;
        this.loading = false;
      }
    );
  }

  // cropper funcs
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(this.imageChangedEvent);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.loading=false;
    // show cropper
    console.log('image loaded');
  }

  cropperReady() {
    // cropper ready
    console.log('cropper ready');
  }

  loadImageFailed() {
    console.log('unable to load image');
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }
}

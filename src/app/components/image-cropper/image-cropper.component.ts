import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css'],
})
export class ImageCropperComponent implements OnInit {
  loading: boolean = false;
  errorMessage: any;
  croppedImageFile!: File;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private imageService: ImageService,
    private dialogRef: MatDialogRef<ImageCropperComponent>
  ) {}

  ngOnInit(): void {
    this.fileChangeEvent(this.data.image);
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  // coplete croping
  done() {
    this.dialogRef.close(this.croppedImage);
    
    // let file = base64ToFile(this.croppedImage);
    // const formData: FormData = new FormData();
    // formData.append('image', file);
    // this.imageService.upload(formData).subscribe(
    //   (response) => {
    //     this.loading = false;
    //     this.dialogRef.close(response);

    //   },
    //   (error) => {
    //     console.log(error.error);
    //     this.errorMessage = error.error;
    //     this.loading = false;
    //   }
    // );
  }

  // croper funcs
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(this.imageChangedEvent);    
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // console.log('imaf cropped');
    // // this.Files = event.file;
    // let fileName = new Date().getTime() + ".png";
    // let filedata = new File([this.croppedImage], fileName, {
    //   type: "image/png",
    //   lastModified: Date.now()
    // });
    // console.log(filedata);
    // this.croppedImageFile=filedata;
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

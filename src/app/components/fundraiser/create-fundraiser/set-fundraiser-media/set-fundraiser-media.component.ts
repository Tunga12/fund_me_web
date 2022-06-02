import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageService } from './../../../../services/image/image.service';
import { base64ToFile } from 'ngx-image-cropper';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperComponent } from './../../../image-cropper/image-cropper.component';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'set-fundraiser-media',
  templateUrl: './set-fundraiser-media.component.html',
  styleUrls: ['./set-fundraiser-media.component.scss'],
})
export class SetFundraiserMediaComponent implements OnInit {
  original_image: any;
  croppedImage: any;

  imageSrc: string = '';
  errorMessage = '';
  loading = false;
  @Input()
  fundraiser!: Fundraiser;
  form!: FormGroup;
  @Output() next = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private imageCropperDialog: MatDialog,
    private imageService: ImageService,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      image: ['', Validators.required],
    });
  }

  // upload the image and go to next step
  nextStep() {
    this.loading = true;
    if (this.croppedImage) {
      let blob = base64ToFile(this.croppedImage);
      var file = new File([blob], 'image.png', {
        type: 'image/png',
        lastModified: new Date().getTime(),
      });

      console.log(file.size);
      const formData: FormData = new FormData();
      formData.append('image', file);
      this.imageService.upload(formData).subscribe(
        (response) => {
          this.fundraiser.image = response;
          this.loading = false;
          this.next.emit(this.fundraiser);
        },
        (error) => {
          console.log(error.error);
          this.errorMessage = error.error;
          this.loading = false;
        }
      );
    } else {
      this.next.emit(this.fundraiser);
    }
  }

  // remove the selected image
  removeImage() {
    this.imageSrc = '';
  }

  editImage() {
    // let blob = base64ToFile(this.croppedImage);
    // var file = new File([blob], 'image.png', {
    //   type: 'image/png',
    //   lastModified: new Date().getTime(),
    // });
    // this.form.get('image')?.setValue(file);
    // console.log(this.original_image);
    // this.onImageChosen(this.original_image);
    this.compressFile();
  }

  // onImageChosen(event: any) {
  //   console.log(event.target.files[0].size);
  //   this.errorMessage = '';
  //   // open the cropper only if image is chosen
  //   if (event.target.value) {
  //     let size_in_mb = event.target.files[0].size / 1048576;

  //     if (size_in_mb > 1) {
  //       this.errorMessage =
  //         'your image size is more than maximum, please choose an image with a lower size.';
  //     } else {
  //       this.original_image = event;
  //       this.imageCropperDialog
  //         .open(ImageCropperComponent, { data: { image: event } })
  //         .afterClosed()
  //         .subscribe((croppedImage) => {
  //           console.log(croppedImage);
  //           if (croppedImage) {
  //             this.imageSrc = croppedImage;
  //             this.fundraiser.image = croppedImage;
  //             this.croppedImage = croppedImage;
  //           }
  //         });
  //     }
  //   } else {
  //     this.errorMessage = 'No image chosen.';
  //   }
  // }

  compressFile() {
    console.log("in compressFile");
    this.imageCompress.uploadFile().then(
      ({ image, orientation }) => {

        // this.imgResultBeforeCompression = image;
        console.log("Size in bytes of the uploaded image was:", this.imageCompress.byteCount(image));

        this.imageCompress
          .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
          .then(
            (compressedImage) => {
              // this.imgResultAfterCompression = compressedImage;
              console.log("Size in bytes after compression is now:", this.imageCompress.byteCount(compressedImage));
              this.original_image = compressedImage;
              this.imageCropperDialog
                .open(ImageCropperComponent, { data: { image: compressedImage } })
                .afterClosed()
                .subscribe((croppedImage) => {
                  console.log(croppedImage);
                  if (croppedImage) {
                    this.imageSrc = croppedImage;
                    this.fundraiser.image = croppedImage;
                    this.croppedImage = croppedImage;
                  }
                });
            }
          );
      }
    );
  }
}

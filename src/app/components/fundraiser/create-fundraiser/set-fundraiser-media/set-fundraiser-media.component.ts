import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageService } from './../../../../services/image/image.service';
import {
  base64ToFile,
  ImageCroppedEvent,
  LoadedImage,
} from 'ngx-image-cropper';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperComponent } from './../../../image-cropper/image-cropper.component';

@Component({
  selector: 'set-fundraiser-media',
  templateUrl: './set-fundraiser-media.component.html',
  styleUrls: ['./set-fundraiser-media.component.css'],
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
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      image: ['', Validators.required],
    });
  }

  // upload the image and go to next step
  nextStep() {
    this.loading = true;
    if (this.croppedImage) {
      let file = base64ToFile(this.croppedImage);
      const formData: FormData = new FormData();
      formData.append('image', file);
      this.imageService.upload(formData).subscribe(
        () => {
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
    let blob = base64ToFile(this.croppedImage);
    var file = new File([blob], 'my_image.png', {
      type: 'image/png',
      lastModified: new Date().getTime(),
    });
    this.form.get('image')?.setValue(file);
    // let fl=new DataTransfer();
    // fl.items.add(file);
    // console.log(fl);
    // this.original_image.target.files=fl
    console.log(this.original_image.srcElement.files);
    this.onImageChosen(this.original_image);
  }

  onImageChosen(event: any) {
    // open the cropper only if image is chosen
    this.original_image = event;
    if (event.target.value) {
      this.imageCropperDialog
        .open(ImageCropperComponent, { data: { image: event } })
        .afterClosed()
        .subscribe((croppedImage) => {
          console.log(croppedImage);
          if (croppedImage) {
            this.imageSrc = croppedImage;
            this.fundraiser.image = croppedImage;
            this.croppedImage = croppedImage;
          }
        });
    }else{
      this.errorMessage="No image chosen."
    }
  }
}

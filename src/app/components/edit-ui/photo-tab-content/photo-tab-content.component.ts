import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { base64ToFile } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { ImageService } from 'src/app/services/image/image.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { ImageCropperComponent } from '../../image-cropper/image-cropper.component';

@Component({
  selector: 'app-photo-tab-content',
  templateUrl: './photo-tab-content.component.html',
  styleUrls: ['./photo-tab-content.component.scss'],
})
export class PhotoTabContentComponent implements OnInit, OnDestroy {
  loading = false;
  fundraiserId: string = '';
  fundraiserSub?: Subscription;
  imageSub?: Subscription;

  errorMessage = '';
  croppedImage: any;
  original_image: any;

  @Input() fundraiser!: Fundraiser;
  form!: FormGroup;
  constructor(
    private fundraiserServ: FundraiserService,
    private imageService: ImageService,
    private snackbarService: SnackbarService,
    private snackbar: MatSnackBar,
    private docTitle: Title,
    private imageCropperDialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.docTitle.setTitle('Change photo');
    this.form = this.formBuilder.group({
      image: '',
    });
  }

  // fundraiser edit
  editFundraiser(fundraiserToEdit: Fundraiser) {
    this.loading = true;
    this.fundraiserSub = this.fundraiserServ
      .editFundraiser(fundraiserToEdit?._id!, fundraiserToEdit)
      .subscribe(
        (response) => {
          this.loading = false;
          this.fundraiser = response;
          console.log(response);
          this.snackbar.open(
            'Photo changed sccessfully',
            'close',
            this.snackbarService.getConfig()
          );
        },
        (error) => {
          this.loading = false;
          console.log(error.error);
          this.errorMessage = error.error;
          this.snackbar.open(
            error.error,
            'close',
            this.snackbarService.getConfig()
          );
        }
      );
  }

  // upload the image chosen by the user
  uploadImage() {
    let file = base64ToFile(this.croppedImage);
    const formData: FormData = new FormData();
    formData.append('image', file, 'img.png');
    this.imageSub = this.imageService.upload(formData).subscribe(
      (response: string) => {
        this.fundraiser.image = response;
        this.loading = false;
        console.log(response);
        this.editFundraiser({ ...this.fundraiser, image: response });
      },
      (error) => {
        this.snackbar.open(
          error.error,
          'close',
          this.snackbarService.getConfig()
        );
        this.errorMessage = error.error;
        this.loading = false;
      }
    );
  }

  onImageChoosen(event: any) {
    this.errorMessage = '';
    this.original_image = event;
    
    this.imageCropperDialog
    .open(ImageCropperComponent, { data: { image: event } })
    .afterClosed()
    .subscribe((croppedImage: any) => {
        if (croppedImage) {
          this.fundraiser.image = croppedImage;
          this.croppedImage = croppedImage;
        }
      });
  }

  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
    this.imageSub?.unsubscribe();
  }
}

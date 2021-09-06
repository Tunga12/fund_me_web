import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPhotoVideoDialogComponent } from '../post-an-update/add-photo-video-dialog/add-photo-video-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image/image.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { base64ToFile } from 'ngx-image-cropper';
import { ImageCropperComponent } from './../image-cropper/image-cropper.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-ui',
  templateUrl: './edit-ui.component.html',
  styleUrls: ['./edit-ui.component.css'],
})
export class EditUiComponent implements OnInit, OnDestroy {
  loading = true;
  fundraiserId: string = '';
  fundraiser!: Fundraiser;
  tabs = [1, 2, 3, 4];
  fundraiserSub?: Subscription;
  imageSub?: Subscription;

  errorMessage = '';
  croppedImage: any;
  original_image: any;

  // form
  form!: FormGroup;
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fundraiserServ: FundraiserService,
    private imageService: ImageService,
    private router: Router,
    private snackbarService: SnackbarService,
    private snackbar: MatSnackBar,
    private docTitle: Title,
    private imageCropperDialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.docTitle.setTitle('Edit fundraiser');
    // get the id parameter from router
    this.fundraiserId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.getFundriser();
    this.form = this.formBuilder.group({
      image: '',
    });
  }

  // get fundriser using id
  getFundriser() {
    this.fundraiserSub = this.fundraiserServ
      .getFundraiser(this.fundraiserId)
      .subscribe((fundraiser) => {
        this.fundraiser = fundraiser;
        this.loading = false;
        console.log(this.fundraiser);
      });
  }

  // fundraiser edit
  editFundraiser(fundraiserToEdit: Fundraiser) {
    this.loading = true;
    let fundraiser = {
      ...fundraiserToEdit,
      ...this.form.value,
      category: fundraiserToEdit.category?._id,
      organizer: fundraiserToEdit.organizer?._id,
    };
    let fundraiserId = fundraiserToEdit._id!;
    // remove the unnecessary elements: not needed for update
    delete fundraiser._id;
    delete fundraiser.__v;
    delete fundraiser.beneficiary;
    console.log(fundraiser);
    
    this.fundraiserSub = this.fundraiserServ
      .editFundraiser(fundraiserId, fundraiser)
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
    formData.append('image', file,'img.png');
    this.imageSub = this.imageService.upload(formData).subscribe(
      (response: string) => {
        this.fundraiser.image = response;
        this.loading = false;
        console.log(response);
        this.editFundraiser({...this.fundraiser,image:response});
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

  openAddPhotoOrVedioDialog() {
    this.dialog
      .open(AddPhotoVideoDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

  backToDetailPage() {
    this.router.navigateByUrl(`/my-fundraiser-detail/${this.fundraiser._id}`);
  }

  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
    this.imageSub?.unsubscribe();
  }
}

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

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fundraiserServ: FundraiserService,
    private imageService: ImageService,
    private router: Router,
    private snackbarService: SnackbarService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // get the id parameter from router
    this.fundraiserId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.getFundriser();
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

  // post edit
  editFundraiser() {
    this.fundraiserSub = this.fundraiserServ
      .editFundraiser(this.fundraiser)
      .subscribe(
        (fundraiser) => {
          this.fundraiser = fundraiser;
          this.snackbar.open(
            'Edit completed sccessfly',
            'close',
            this.snackbarService.getConfig()
          );
        },
        (error) => {
          this.snackbar.open(
            error.error,
            'close',
            this.snackbarService.getConfig()
          );
          console.log(error.error);
          this.errorMessage = error.error;
        }
      );
  }

  // upload the image chosen by the user
  uploadImage(event: any) {
    this.loading = true;
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    this.imageSub = this.imageService.upload(formData).subscribe(
      (response: string) => {
        this.fundraiser.image = response;
        this.loading = false;
        // this.snackbar.open(
        //   'Edit completed sccessfly',
        //   'close',
        //   this.snackbarService.getConfig()
        // );
      },
      (error) => {
        this.snackbar.open(
          error.error,
          'close',
          this.snackbarService.getConfig()
        );
        console.log(error.error);
        this.errorMessage = error.error;
        this.loading = false;
      }
    );
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

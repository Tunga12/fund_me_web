import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit, OnDestroy {
  @Input() fundraiser!: Fundraiser;
  form!: FormGroup;

  fundraiserSub?: Subscription;
  errorMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private fundraiserService: FundraiserService,
    private snackbarService: SnackbarService,
    private snackbar: MatSnackBar,
    private docTitle: Title
  ) {}

  ngOnInit(): void {
    this.docTitle.setTitle('Edit story');
    this.form = this.formBuilder.group({
      story: ['', [Validators.required, Validators.minLength(20)]],
    });
    this.form.patchValue(this.fundraiser);
  }

  public get story(): AbstractControl | null {
    return this.form.get('story');
  }

  // post edit
  editStory() {
    let fundraiser = {
      ...this.fundraiser,
      ...this.form.value,
      category: this.fundraiser.category?._id,
      organizer: this.fundraiser.organizer?._id,
    };
    let fundraiserId = this.fundraiser._id!;
    // remove the unnecessary elements: not needed for update
    delete fundraiser._id;
    delete fundraiser.__v;
    delete fundraiser.beneficiary;

    this.fundraiserSub = this.fundraiserService
      .editFundraiser(fundraiserId, fundraiser)
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
  ngOnDestroy() {
    this.fundraiserSub?.unsubscribe();
  }
}

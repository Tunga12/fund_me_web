import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit, OnDestroy {
  @Input() fundraiser!: Fundraiser;
  form!: FormGroup;

  fundraiserSub?: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private fundraiserService: FundraiserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      story: [],
    });
  }

  // post edit
  editStory() {
    this.fundraiserSub = this.fundraiserService
      .editFundraiser(this.fundraiser)
      .subscribe((fundraiser) => {
        this.fundraiser = fundraiser;
        // console.log(this.fundraiser);
      });
  }
  ngOnDestroy() {
    this.fundraiserSub?.unsubscribe();
  }
}

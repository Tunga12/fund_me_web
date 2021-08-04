import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'set-fundraiser-story',
  templateUrl: './set-fundraiser-story.component.html',
  styleUrls: ['./set-fundraiser-story.component.css'],
})
export class SetFundraiserStoryComponent implements OnInit {
  @Input() fundraiser!: Fundraiser;
  @Output() next = new EventEmitter();
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // create the form
    this.form = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      story: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  public get title(): AbstractControl | null {
    return this.form.get('title');
  }

  public get story(): AbstractControl | null {
    return this.form.get('story');
  }

  nextStep() {
    this.fundraiser = { ...this.fundraiser, ...this.form.value };
    this.next.emit(this.fundraiser);
  }
}

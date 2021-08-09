import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageService } from './../../../../services/image/image.service';

@Component({
  selector: 'set-fundraiser-media',
  templateUrl: './set-fundraiser-media.component.html',
  styleUrls: ['./set-fundraiser-media.component.css'],
})
export class SetFundraiserMediaComponent implements OnInit {
  imageSrc!: string;
  errorMessage = '';
  loading = false;
  @Input()
  fundraiser!: Fundraiser;
  form!: FormGroup;
  @Output() next = new EventEmitter();
  constructor(
    private imageService: ImageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      image: ['',Validators.required],
    });
  }
  nextStep() {
    console.log(this.form.value);
    console.log(this.fundraiser);

    // this.fundraiser = { ...this.fundraiser, ...this.form.value }
    console.log(this.fundraiser);
    this.next.emit(this.fundraiser);
  }

  onImageChoosen(event: any) {
    this.loading = true;
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    this.imageService.upload(formData).subscribe(
      (response) => {
        this.imageSrc = response;
        this.fundraiser.image = response;
        this.loading = false;
      },
      (error) => {
        console.log(error.error);
        this.errorMessage = error.error;
        this.loading = false;
      }
    );
  }
}

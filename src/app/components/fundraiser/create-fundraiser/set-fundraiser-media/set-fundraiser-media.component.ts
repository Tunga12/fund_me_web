import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'set-fundraiser-media',
  templateUrl: './set-fundraiser-media.component.html',
  styleUrls: ['./set-fundraiser-media.component.css'],
})
export class SetFundraiserMediaComponent implements OnInit {
  imageSrc!: string;

  @Input()
  fundraiser!: Fundraiser;
  @Input() form!: FormGroup;
  @Output() next = new EventEmitter();

  constructor(private router: Router, private httpClient: HttpClient) {}

  ngOnInit(): void {}
  nextStep() {
    this.next.emit(this.fundraiser);

    console.log(this.form.value);
    this.httpClient
      .post(`${environment.BASE_URL}/image`, this.form.value)
      .subscribe((res) => {
        console.log(res);
        alert('Uploaded Successfully.');
      });
  }

  onImageChoosen(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.form.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }
}

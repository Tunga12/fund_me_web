import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdrwal',
  templateUrl: './withdrwal.component.html',
  styleUrls: ['./withdrwal.component.css'],
})
export class WithdrwalComponent implements OnInit {
  constructor(private router: Router) {}
  withdrawer = '';
  saving_type = '';
  ngOnInit(): void {}

  form = new FormGroup({
    withdrawer: new FormControl('', []),
    saving_type: new FormControl('', []),
  });

  openPersonalInfoForm() {
    this.router.navigateByUrl('/withdrawal/personal-info');
  }
}

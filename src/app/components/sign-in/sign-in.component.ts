import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'sign-in-page',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit, OnDestroy {
  loading = false;
  logInSub?: Subscription;
  logInMessage?: string;
  hidePassword = true; // to toggle visiblity of password
  logInSuccessfull = false; // to know the login status
  form!: FormGroup;

  constructor(
    private authServ: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ,
    private docTitle: Title
  ) {}

  ngOnInit(): void {
    this.docTitle.setTitle('GoFundMe | Sign in');

    // build the form
    this.form = this.formBuilder.group({
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required]],
    });
  }

  signIn() {
    this.loading = true;
    this.logInSub = this.authServ.signIn(this.form.value).subscribe(
      (result: HttpResponse<any>) => {
        this.logInSuccessfull = result.body || false;
        let token = result.headers.get('x-auth-token');
        if (token) {
          localStorage.setItem('x-auth-token', token);
        }
        if (this.logInSuccessfull) {
          this.router.navigateByUrl('/home-page');
          // location.reload();
        }
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        // this.password?.setValue('');
        this.logInMessage = 'Incorrect email or Password';
        console.log(error.message);
      }
    );
  }

  change() {
    this.logInMessage = '';    
  }

  public get email(): AbstractControl | null {
    return this.form.get('email');
  }

  public get password(): AbstractControl | null {
    return this.form.get('password');
  }

  // what to do when the component destroys
  ngOnDestroy(): void {
    this.logInSub?.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'sign-in-page',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit, OnDestroy {
  loading = false;
  logInSub?: Subscription;
  logInMessage?: string;
  // TODO

  hidePassword = true; // to toggle visiblity of password
  logInSuccessfull = false; // to know the login status
  form!: FormGroup;

  constructor(
    private authServ: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    // clear the localStorage
    localStorage.clear();
    // build the form
     this.form = this.formBuilder.group({
      email: [, [Validators.required()]],
      password: [, [Validators.required()]],
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
        this.password?.setValue('');
        this.logInMessage = 'Incorrect email or Password';
        console.log(error.message);
      }
    );
  }

  change() {
    this.logInMessage= '';
 }

public get email() : AbstractControl|null {
  return this.form.get('email');
}

public get password() : AbstractControl|null {
  return this.form.get('password');
}

  // what to do when the component destroys
  ngOnDestroy(): void {
    this.logInSub?.unsubscribe();
  }
}

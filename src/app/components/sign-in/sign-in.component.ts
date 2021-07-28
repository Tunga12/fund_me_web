import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sign-in-page',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit, OnDestroy {
  logInSub?: Subscription;
  logInMessage?: string;
  // TODO
  // these are for testing
  email = 'email@gmail.com';
  password = 'password';

  hidePassword = true; // to toggle visiblity of password
  logInSuccessfull = false; // to know the login status
  form: FormGroup;

  constructor(
    private authServ: AuthService,
    formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = formBuilder.group({
      email: [, [Validators.required()]],
      password: [, [Validators.required()]],
    });
  }

  ngOnInit(): void {}

  signIn() {
    this.logInSub = this.authServ
      .signIn(this.email, this.password)
      .subscribe((result: boolean) => {
        this.logInSuccessfull = result;
        if (this.logInSuccessfull) {
          // TODO : add the user object to the route as router argument
          this.router.navigateByUrl('/home-page');
        }
      });
    this.logInMessage = 'Incorrect email or Password';
  }

  // what to do when the component destroys
  ngOnDestroy(): void {
    // unsubscribe from the login subscription if exists;
    if (this.logInSub) this.logInSub.unsubscribe();
  }
}

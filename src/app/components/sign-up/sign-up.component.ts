import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from './../../models/user.model';
import { Validators } from 'ngx-editor';
import { AuthService } from './../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnDestroy {
  hidePassword = true; // to toggle the visiblity of password
  signUpSecussful = false; // to know the succefullness of sign up and show and hide spinner
  user: User;

  form: FormGroup;

  // subsctiption
  private signUpSub?: Subscription;

  constructor(
    private authServ: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // initialize the user object with empty fields
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };

    // create the form
    this.form = this.formBuilder.group({
      firstName: [,],
      lastName: [,],
      email: [Validators.required()],
      password: [Validators.required()],
    });
  }

  signUp() {
    this.signUpSub = this.authServ
      .signUp(this.user)
      .subscribe((user_result) => {
        // TODO
        this.router.navigate(['/home-page',{user:user_result}]);
        console.log(user_result);
      });
  }

  ngOnDestroy(): void {
    // unsubscrib from the subscription
    if (this.signUpSub) this.signUpSub.unsubscribe();
  }
}

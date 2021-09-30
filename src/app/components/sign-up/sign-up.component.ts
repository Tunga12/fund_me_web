import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { WhiteSpaceValidatorDirective } from 'src/app/validators/white-space.validator.directive';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  loading = false;
  errorMessage = '';
  hidePassword = true; // to toggle the visiblity of password
  // hideConfirmPassword = true; // to toggle the visiblity of confirmPassword
  signUpSecussful = false; // to know the succefullness of register and show and hide spinner
  form!: FormGroup;
  // subsctiption
  private signUpSub?: Subscription;

  // validate the existance of whitesaces in our input
  whiteSpaceValidator = new WhiteSpaceValidatorDirective();

  constructor(
    private authServ: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private docTitle: Title,
    private translate: TranslateService,
    ) {
      this.translate.setDefaultLang('en');
      this.translate.use(localStorage.getItem('lang') || 'en');
    }
  ngOnInit(): void {
    this.docTitle.setTitle('Legas | Register');
    // create the form
    this.form = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          this.whiteSpaceValidator,
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          this.whiteSpaceValidator,
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          this.whiteSpaceValidator
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
          ),
        ],
      ],

      confirmPassword: ['', [Validators.required]],
    });
  }

  signUp() {
    this.loading = true;
    delete this.form.value['confirmPassword'];
    this.signUpSub = this.authServ.signUp(this.form.value).subscribe(
      (result) => {
        let token = result.headers.get('x-auth-token');
        if (token) {
          localStorage.setItem('x-auth-token', token);
          localStorage.setItem('userId', (result.body as User)._id ?? '');
        }

        let redirect_url = localStorage.getItem('redirect-url');
        localStorage.removeItem('redirect-url');
        this.loading = false;
        redirect_url
          ? this.router.navigateByUrl(redirect_url)
          : this.router.navigateByUrl('/home-page');
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
        this.loading = false;
      }
    );
  }

  /** getters for controls */
  public get firstName(): AbstractControl | null {
    return this.form.get('firstName');
  }

  public get lastName(): AbstractControl | null {
    return this.form.get('lastName');
  }

  public get email(): AbstractControl | null {
    return this.form.get('email');
  }
  public get phone(): AbstractControl | null {
    return this.form.get('phoneNumber');
  }

  public get password(): AbstractControl | null {
    return this.form.get('password');
  }
  public get confirmPassword(): AbstractControl | null {
    return this.form.get('confirmPassword');
  }

  onPasswordChange() {
    if (this.confirmPassword?.value == this.password?.value) {
      this.confirmPassword?.setErrors(null);
    } else {
      this.confirmPassword?.setErrors({ mismatch: true });
    }
  }

  ngOnDestroy(): void {
    // unsubscrib from the subscription
    this.signUpSub?.unsubscribe();
  }
}

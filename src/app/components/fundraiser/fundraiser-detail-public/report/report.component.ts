import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { Report } from 'src/app/models/report.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  loading = false;
  errorMessage = '';
  hidePassword = true; // to toggle the visiblity of password
  // hideConfirmPassword = true; // to toggle the visiblity of confirmPassword
  signUpSecussful = false; // to know the succefullness of register and show and hide spinner
  form!: FormGroup;

  reportTypes = [];

  constructor(private formBuilder: FormBuilder, private docTitle: Title, ) { }

  ngOnInit(): void {
    this.docTitle.setTitle('Legas | Report');

    // create the form
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      url: ['', [Validators.required]],
      knowsOrganizer: [null, [Validators.required]],
      knowsDescription: ['', [Validators.maxLength(250)]],
      reportType: ['', [Validators.required]],
      reportDescription: ['', [Validators.required, Validators.maxLength(350)]],

    });
  }



  /** getters for controls */
  public get name(): AbstractControl | null {
    return this.form.get('name');
  }

  public get url(): AbstractControl | null {
    return this.form.get('url');
  }

  public get email(): AbstractControl | null {
    return this.form.get('email');
  }
  public get phone(): AbstractControl | null {
    return this.form.get('phoneNumber');
  }

  public get knowsOrganizer(): AbstractControl | null {
    return this.form.get('knowsOrganizer');
  }
  public get knowsDescription(): AbstractControl | null {
    return this.form.get('knowsDescription');
  }
  public get reportType(): AbstractControl | null {
    return this.form.get('reportType');
  }
  public get reportDescription(): AbstractControl | null {
    return this.form.get('reportDescription');
  }


  onPasswordChange() {
    // if (this.confirmPassword?.value == this.password?.value) {
    //   this.confirmPassword?.setErrors(null);
    // } else {
    //   this.confirmPassword?.setErrors({ mismatch: true });
    // }
  }

  signUp() {
    // this.loading = true;
    // this.authServ.signUp(this.form.value).subscribe(
    //   (result) => {
    //     let token = result.headers.get('x-auth-token');
    //     if (token) {
    //       localStorage.setItem('x-auth-token', token);
    //       localStorage.setItem('userId', (result.body as User)._id ?? '');
    //     }

    //     let redirect_url = localStorage.getItem('redirect-url');
    //     localStorage.removeItem('redirect-url');
    //     this.loading = false;
    //     redirect_url
    //       ? this.router.navigateByUrl(redirect_url)
    //       : this.router.navigateByUrl('/home-page');
    //   },
    //   (error: HttpErrorResponse) => {
    //     this.errorMessage = error.error;
    //     this.loading = false;
    //   }
    // );
  }

}

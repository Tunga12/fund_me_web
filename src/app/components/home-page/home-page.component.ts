import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { HomeFundraiser } from 'src/app/models/home-fundraiser.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private router: Router,
    private docTitle: Title,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.docTitle.setTitle('Home page');
  }

  createPage() {
    this.router.navigateByUrl('/create');
  }
}

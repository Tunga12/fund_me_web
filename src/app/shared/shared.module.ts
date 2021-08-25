import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { TimeagoModule } from 'ngx-timeago';

import { AccountSettingComponent } from '../components/account-setting/account-setting.component';
import { PasswordResetComponent } from '../components/account-setting/password-reset/password-reset.component';
import { PublicFundListComponent } from '../components/fundraiser-list/public-fund-list/public-fund-list.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { SearchComponent } from '../components/search/search.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { StoryTextAreaComponent } from '../components/story-text-area/story-text-area.component';
import { MyMaterialModule } from '../modules/material.module';
import { AppRoutesModule } from '../modules/routes.module';


const ROUTES: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 's',
    component: SearchComponent,
  },
  // { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
]

@NgModule({
  declarations: [
    PublicFundListComponent,
    SignInComponent,
    PageNotFoundComponent,
    SearchComponent,
    SignUpComponent,
    NavBarComponent,
    AccountSettingComponent,
    PasswordResetComponent,
    StoryTextAreaComponent,
  ],
  imports: [
    CommonModule,
    TimeagoModule.forChild(
    ),
    RouterModule.forChild(ROUTES),
    MyMaterialModule,
    AppRoutesModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEditorModule,
  ],
  exports: [
    FlexLayoutModule,
    StoryTextAreaComponent,
    PublicFundListComponent,
    PageNotFoundComponent,
    MyMaterialModule,
    ReactiveFormsModule,
    SearchComponent,
    NavBarComponent,
    AppRoutesModule,
    AccountSettingComponent,
    PasswordResetComponent,
    TimeagoModule,
    HttpClientModule,
    NgxEditorModule,
  ]
})
export class SharedModule { }

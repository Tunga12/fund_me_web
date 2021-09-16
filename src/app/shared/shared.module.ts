import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {     ChangeDetectionStrategy 
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEditorModule,
    MatExpansionModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  exports: [
    MatExpansionModule,
    FlexLayoutModule,
    StoryTextAreaComponent,
    PublicFundListComponent,
    PageNotFoundComponent,
    MyMaterialModule,
    ReactiveFormsModule,
    SearchComponent,
    NavBarComponent,
    AccountSettingComponent,
    PasswordResetComponent,
    TimeagoModule,
    HttpClientModule,
    NgxEditorModule,
    TranslateModule
  ]
})
export class SharedModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
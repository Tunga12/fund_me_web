import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MyMaterialModule } from './modules/material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppRoutesModule } from './modules/routes.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { EditUiComponent } from './components/edit-ui/edit-ui.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PhoneInviteDialogComponent } from './components/invite/phone-invite-dialog/phone-invite-dialog.component';
import { AddPhotoVideoDialogComponent } from './components/post-an-update/add-photo-video-dialog/add-photo-video-dialog.component';
import { AddYoutubeVideoDialogComponent } from './components/post-an-update/add-youtube-video-dialog/add-youtube-video-dialog.component';
import { PostAnUpdateComponent } from './components/post-an-update/post-an-update.component';
import { ShareDialogComponent } from './components/shared/share-dialog/share-dialog.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddTeamMembersDialogComponent } from './components/teams/add-team-members-dialog/add-team-members-dialog.component';
import { ImportContactsDialogComponent } from './components/teams/import-contacts-dialog/import-contacts-dialog.component';
import { YoutubeVideoPlayerComponent } from './components/shared/youtube-video-player/youtube-video-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { StoryTextAreaComponent } from './components/shared/story-text-area/story-text-area.component';
import { FundraiserListComponent } from './components/fundraiser-list/fundraiser-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WithdrwalComponent } from './components/withdrwal/withdrwal.component';
import { PersonalInfoComponent } from './components/withdrwal/personal-info/personal-info.component';
import { PersonalInfoSummaryComponent } from './components/withdrwal/personal-info-summary/personal-info-summary.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { BeneficiaryFormComponent } from './components/withdrwal/beneficiary-form/beneficiary-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './components/notification/notification.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { DonateComponent } from './components/donate/donate.component';
import { CreateFundraiserComponent } from './components/fundraiser/create-fundraiser/create-fundraiser.component';
import { SetFundraiserMediaComponent } from './components/fundraiser/create-fundraiser/set-fundraiser-media/set-fundraiser-media.component';
import { DoantionsComponent } from './components/fundraiser/fudraiser-detail-public/doantions/doantions.component';
import { FudraiserDetailPublicComponent } from './components/fundraiser/fudraiser-detail-public/fudraiser-detail-public.component';
import { TopDoantionsComponent } from './components/fundraiser/fudraiser-detail-public/top-doantions/top-doantions.component';
import { BannerComponent } from './components/fundraiser/my-fundraiser-detail/banner/banner.component';
import { DonationsTabConntentComponent } from './components/fundraiser/my-fundraiser-detail/donors-tab-conntent/donations-tab-conntent/donations-tab-conntent.component';
import { DonorsTabConntentComponent } from './components/fundraiser/my-fundraiser-detail/donors-tab-conntent/donors-tab-conntent.component';
import { InvitedContactsTabContentComponent } from './components/fundraiser/my-fundraiser-detail/donors-tab-conntent/invited-contacts-tab-content/invited-contacts-tab-content.component';
import { MyFundraiserDetailComponent } from './components/fundraiser/my-fundraiser-detail/my-fundraiser-detail.component';
import { TeamTabContentComponent } from './components/fundraiser/my-fundraiser-detail/team-tab-content/team-tab-content.component';
import { UpdatesTabContentComponent } from './components/fundraiser/my-fundraiser-detail/updates-tab-content/updates-tab-content.component';
import { EmailInviteDialogComponent } from './components/invite/email-invite-dialog/email-invite-dialog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { HttpHeaderInterceptor } from './interceptors/http-headers.interceptor';
import { SetFundraiserGoalComponent } from './components/fundraiser/create-fundraiser/set-fundraiser-goal/set-fundraiser-goal.component';
import { SetBasicInfoComponent } from './components/fundraiser/create-fundraiser/set-basic-info/set-basic-info.component';
import { SetFundraiserStoryComponent }  from './components/fundraiser/create-fundraiser/set-fundraiser-story/set-fundraiser-story.component';
import { NgxEditorModule } from 'ngx-editor';

const customConfig = {};
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignInComponent,
    SignUpComponent,
    CreateFundraiserComponent,
    SetBasicInfoComponent,
    SetFundraiserMediaComponent,
    SetFundraiserStoryComponent,
    SetFundraiserGoalComponent,
    MyFundraiserDetailComponent,
    HomePageComponent,
    ShareDialogComponent,
    EmailInviteDialogComponent,
    PhoneInviteDialogComponent,
    PostAnUpdateComponent,
    AddPhotoVideoDialogComponent,
    AddYoutubeVideoDialogComponent,
    AddTeamMembersDialogComponent,
    ImportContactsDialogComponent,
    EditUiComponent,
    YoutubeVideoPlayerComponent,
    StoryTextAreaComponent,
    FundraiserListComponent,
    WithdrwalComponent,
    PersonalInfoComponent,
    PersonalInfoSummaryComponent,
    BeneficiaryFormComponent,
    FudraiserDetailPublicComponent,
    DonateComponent,
    DoantionsComponent,
    TopDoantionsComponent,
    BannerComponent,
    DonationsTabConntentComponent,
    InvitedContactsTabContentComponent,
    DonorsTabConntentComponent,
    TeamTabContentComponent,
    UpdatesTabContentComponent,
    NotificationComponent,
    PageNotFoundComponent,
  ],
  entryComponents: [],
  imports: [
  YouTubePlayerModule,
    BrowserModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    RouterModule,
    AppRoutesModule,
    FlexLayoutModule,
    NgxEditorModule,
    ShareButtonsModule,
    ShareIconsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

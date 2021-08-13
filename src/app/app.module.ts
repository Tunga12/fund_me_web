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
import { AddTeamMembersDialogComponent } from './components/fundraiser/my-fundraiser-detail/team-tab-content/add-team-members-dialog/add-team-members-dialog.component';
import { ImportContactsDialogComponent } from './components/teams/import-contacts-dialog/import-contacts-dialog.component';
import { YoutubeVideoPlayerComponent } from './components/shared/youtube-video-player/youtube-video-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { StoryTextAreaComponent } from './components/shared/story-text-area/story-text-area.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WithdrwalComponent } from './components/withdrwal/withdrwal.component';
import { PersonalInfoComponent } from './components/withdrwal/personal-info/personal-info.component';
import { PersonalInfoSummaryComponent } from './components/withdrwal/personal-info-summary/personal-info-summary.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { TimeagoModule } from 'ngx-timeago';

import { BeneficiaryFormComponent } from './components/withdrwal/beneficiary-form/beneficiary-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './components/notification/notification.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DonateComponent } from './components/donate/donate.component';
import { CreateFundraiserComponent } from './components/fundraiser/create-fundraiser/create-fundraiser.component';
import { SetFundraiserMediaComponent } from './components/fundraiser/create-fundraiser/set-fundraiser-media/set-fundraiser-media.component';
import { DoantionsComponent } from './components/fundraiser/fudraiser-detail-public/doantions/doantions.component';
import { FudraiserDetailPublicComponent } from './components/fundraiser/fudraiser-detail-public/fudraiser-detail-public.component';
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
import { SetFundraiserStoryComponent } from './components/fundraiser/create-fundraiser/set-fundraiser-story/set-fundraiser-story.component';
import { NgxEditorModule } from 'ngx-editor';
import { OverviewComponent } from './components/edit-ui/overview/overview.component';
import { DeleteDialogComponent } from './components/edit-ui/overview/delete-dialog/delete-dialog.component';
import { StoryComponent } from './components/edit-ui/story/story.component';
import { ResponsiveColumnsDirective } from './breakpoints/responsive-columns.directive';
import { AccountSettingComponent } from './components/account-setting/account-setting.component';
import { PasswordResetComponent } from './components/account-setting/password-reset/password-reset.component';
import { SearchComponent } from './components/search/search.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteAccountDialogComponent } from './components/account-setting/delete-account-dialog/delete-account-dialog.component';
import { MyFundraisersComponent } from './components/fundraiser/my-fundraisers/my-fundraisers.component';
import { PublicFundListComponent } from './components/fundraiser-list/public-fund-list/public-fund-list.component';
import { MyFundListComponent } from './components/fundraiser-list/my-fund-list/my-fund-list.component';
import { TeamMemberComponent } from './components/fundraiser/my-fundraisers/team-member/team-member.component';
import { BeneficiaryComponent } from './components/fundraiser/my-fundraisers/beneficiary/beneficiary.component';
import { OrganizerComponent } from './components/fundraiser/my-fundraisers/organizer/organizer.component';

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
    WithdrwalComponent,
    PersonalInfoComponent,
    PersonalInfoSummaryComponent,
    BeneficiaryFormComponent,
    FudraiserDetailPublicComponent,
    DonateComponent,
    DoantionsComponent,
    BannerComponent,
    DonationsTabConntentComponent,
    InvitedContactsTabContentComponent,
    DonorsTabConntentComponent,
    TeamTabContentComponent,
    UpdatesTabContentComponent,
    NotificationComponent,
    PageNotFoundComponent,
    OverviewComponent,
    DeleteDialogComponent,
    StoryComponent,
    ResponsiveColumnsDirective,
    AccountSettingComponent,
    PasswordResetComponent,
    SearchComponent,
    DeleteAccountDialogComponent,
    MyFundraisersComponent,
    PublicFundListComponent,
    MyFundListComponent,
    TeamMemberComponent,
    BeneficiaryComponent,
    OrganizerComponent,
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
    TimeagoModule.forRoot(),
  ],

  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
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

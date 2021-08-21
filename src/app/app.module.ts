import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxEditorModule } from 'ngx-editor';
import { NgxPayPalModule } from 'ngx-paypal';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { TimeagoModule } from 'ngx-timeago';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { ResponsiveColumnsDirective } from './breakpoints/responsive-columns.directive';
import { AccountSettingComponent } from './components/account-setting/account-setting.component';
import {
  DeleteAccountDialogComponent,
} from './components/account-setting/delete-account-dialog/delete-account-dialog.component';
import { PasswordResetComponent } from './components/account-setting/password-reset/password-reset.component';
import { DonateComponent } from './components/donate/donate.component';
import { EditUiComponent } from './components/edit-ui/edit-ui.component';
import { DeleteDialogComponent } from './components/edit-ui/overview/delete-dialog/delete-dialog.component';
import { OverviewComponent } from './components/edit-ui/overview/overview.component';
import { StoryComponent } from './components/edit-ui/story/story.component';
import { MyFundListComponent } from './components/fundraiser-list/my-fund-list/my-fund-list.component';
import { CreateFundraiserComponent } from './components/fundraiser/create-fundraiser/create-fundraiser.component';
import { SetBasicInfoComponent } from './components/fundraiser/create-fundraiser/set-basic-info/set-basic-info.component';
import {
  SetFundraiserGoalComponent,
} from './components/fundraiser/create-fundraiser/set-fundraiser-goal/set-fundraiser-goal.component';
import {
  SetFundraiserMediaComponent,
} from './components/fundraiser/create-fundraiser/set-fundraiser-media/set-fundraiser-media.component';
import {
  SetFundraiserStoryComponent,
} from './components/fundraiser/create-fundraiser/set-fundraiser-story/set-fundraiser-story.component';
import { DoantionsComponent } from './components/fundraiser/fudraiser-detail-public/doantions/doantions.component';
import {
  FudraiserDetailPublicComponent,
} from './components/fundraiser/fudraiser-detail-public/fudraiser-detail-public.component';
import { BannerComponent } from './components/fundraiser/my-fundraiser-detail/banner/banner.component';
import {
  DonationsTabConntentComponent,
} from './components/fundraiser/my-fundraiser-detail/donors-tab-conntent/donations-tab-conntent/donations-tab-conntent.component';
import {
  DonorsTabConntentComponent,
} from './components/fundraiser/my-fundraiser-detail/donors-tab-conntent/donors-tab-conntent.component';
import {
  InvitedContactsTabContentComponent,
} from './components/fundraiser/my-fundraiser-detail/donors-tab-conntent/invited-contacts-tab-content/invited-contacts-tab-content.component';
import { MyFundraiserDetailComponent } from './components/fundraiser/my-fundraiser-detail/my-fundraiser-detail.component';
import {
  AddTeamMembersDialogComponent,
} from './components/fundraiser/my-fundraiser-detail/team-tab-content/add-team-members-dialog/add-team-members-dialog.component';
import {
  TeamTabContentComponent,
} from './components/fundraiser/my-fundraiser-detail/team-tab-content/team-tab-content.component';
import {
  UpdatesTabContentComponent,
} from './components/fundraiser/my-fundraiser-detail/updates-tab-content/updates-tab-content.component';
import { BeneficiaryComponent } from './components/fundraiser/my-fundraisers/beneficiary/beneficiary.component';
import { MyFundraisersComponent } from './components/fundraiser/my-fundraisers/my-fundraisers.component';
import { OrganizerComponent } from './components/fundraiser/my-fundraisers/organizer/organizer.component';
import { TeamMemberComponent } from './components/fundraiser/my-fundraisers/team-member/team-member.component';
import {
  WithdrawalsHistoryComponent,
} from './components/fundraiser/withdrawals/withdrawals-history/withdrawals-history.component';
import {
  WithdrawalsOverviewComponent,
} from './components/fundraiser/withdrawals/withdrawals-overview/withdrawals-overview.component';
import { WithdrawalsComponent } from './components/fundraiser/withdrawals/withdrawals.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EmailInviteDialogComponent } from './components/invite/email-invite-dialog/email-invite-dialog.component';
import { PhoneInviteDialogComponent } from './components/invite/phone-invite-dialog/phone-invite-dialog.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {
  AddPhotoVideoDialogComponent,
} from './components/post-an-update/add-photo-video-dialog/add-photo-video-dialog.component';
import {
  AddYoutubeVideoDialogComponent,
} from './components/post-an-update/add-youtube-video-dialog/add-youtube-video-dialog.component';
import { PostAnUpdateComponent } from './components/post-an-update/post-an-update.component';
import { SearchComponent } from './components/search/search.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StoryTextAreaComponent } from './components/story-text-area/story-text-area.component';
import { ImportContactsDialogComponent } from './components/teams/import-contacts-dialog/import-contacts-dialog.component';
import { BeneficiaryFormComponent } from './components/withdrawal/beneficiary-form/beneficiary-form/beneficiary-form.component';
import { PersonalInfoSummaryComponent } from './components/withdrawal/personal-info-summary/personal-info-summary.component';
import { PersonalInfoComponent } from './components/withdrawal/personal-info/personal-info.component';
import { YoutubeVideoPlayerComponent } from './components/youtube-video-player/youtube-video-player.component';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { HttpHeaderInterceptor } from './interceptors/http-headers.interceptor';
import { MyMaterialModule } from './modules/material.module';
import { SharedModule } from './shared/shared.module';
import { SuccessPageComponent } from './components/withdrawal/success-page/success-page.component';
import { WithdrwalComponent } from './components/withdrawal/withdrwal.component';
import { ConfirmPageComponent } from './components/withdrawal/beneficiary-form/confirm-page/confirm-page.component';
import { ActiveUsersComponent } from './components/users/active-users/active-users.component';
import { DeletedUsersComponent } from './components/users/deleted-users/deleted-users.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableExporterModule } from 'mat-table-exporter';

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
    MyFundListComponent,
    TeamMemberComponent,
    BeneficiaryComponent,
    OrganizerComponent,
    WithdrawalsComponent,
    WithdrawalsOverviewComponent,
    WithdrawalsHistoryComponent,
    SuccessPageComponent,
    ConfirmPageComponent,
    ActiveUsersComponent,
    DeletedUsersComponent,
  ],
  entryComponents: [],
  imports: [
    FormsModule,
    YouTubePlayerModule,
    BrowserModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    RouterModule,
    FlexLayoutModule,
    TimeagoModule.forRoot(),
    NgxEditorModule,
    ShareButtonsModule.withConfig(
      {
        debug: true,
      }
    ),
    ShareIconsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPayPalModule,
    AdminModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],

  providers: [
    MatDatepickerModule,
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
export class AppModule { }

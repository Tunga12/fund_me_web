import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxPayPalModule } from 'ngx-paypal';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { DeleteAccountDialogComponent } from './components/account-setting/delete-account-dialog/delete-account-dialog.component';
import { DonateComponent } from './components/donate/donate.component';
import { EditUiComponent } from './components/edit-ui/edit-ui.component';
import { DeleteDialogComponent } from './components/edit-ui/overview/delete-dialog/delete-dialog.component';
import { OverviewComponent } from './components/edit-ui/overview/overview.component';
import { StoryComponent } from './components/edit-ui/story/story.component';
import { MyFundListComponent } from './components/fundraiser-list/my-fund-list/my-fund-list.component';
import { CreateFundraiserComponent } from './components/fundraiser/create-fundraiser/create-fundraiser.component';
import { SetBasicInfoComponent } from './components/fundraiser/create-fundraiser/set-basic-info/set-basic-info.component';

import { SetFundraiserMediaComponent } from './components/fundraiser/create-fundraiser/set-fundraiser-media/set-fundraiser-media.component';
import { SetFundraiserStoryComponent } from './components/fundraiser/create-fundraiser/set-fundraiser-story/set-fundraiser-story.component';
import { DonationsComponent } from './components/fundraiser/fundraiser-detail-public/donations/donations.component';

import { BannerComponent } from './components/fundraiser/my-fundraiser-detail/banner/banner.component';
import { DonationsTabConntentComponent } from './components/fundraiser/my-fundraiser-detail/donors-tab-conntent/donations-tab-conntent/donations-tab-conntent.component';
import { DonorsTabConntentComponent } from './components/fundraiser/my-fundraiser-detail/donors-tab-conntent/donors-tab-content.component';
import { InvitedContactsTabContentComponent } from './components/fundraiser/my-fundraiser-detail/donors-tab-conntent/invited-contacts-tab-content/invited-contacts-tab-content.component';
import { MyFundraiserDetailComponent } from './components/fundraiser/my-fundraiser-detail/my-fundraiser-detail.component';
import { AddTeamMembersDialogComponent } from './components/fundraiser/my-fundraiser-detail/team-tab-content/add-team-members-dialog/add-team-members-dialog.component';
import { TeamTabContentComponent } from './components/fundraiser/my-fundraiser-detail/team-tab-content/team-tab-content.component';
import { UpdatesTabContentComponent } from './components/fundraiser/my-fundraiser-detail/updates-tab-content/updates-tab-content.component';
import { BeneficiaryComponent } from './components/fundraiser/my-fundraisers/beneficiary/beneficiary.component';
import { MyFundraisersComponent } from './components/fundraiser/my-fundraisers/my-fundraisers.component';
import { OrganizerComponent } from './components/fundraiser/my-fundraisers/organizer/organizer.component';
import { TeamMemberComponent } from './components/fundraiser/my-fundraisers/team-member/team-member.component';
import { WithdrawalsHistoryComponent } from './components/fundraiser/withdrawals/withdrawals-history/withdrawals-history.component';
import { WithdrawalsOverviewComponent } from './components/fundraiser/withdrawals/withdrawals-overview/withdrawals-overview.component';
import { WithdrawalsComponent } from './components/fundraiser/withdrawals/withdrawals.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EmailInviteDialogComponent } from './components/invite/email-invite-dialog/email-invite-dialog.component';
import { PhoneInviteDialogComponent } from './components/invite/phone-invite-dialog/phone-invite-dialog.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AddPhotoVideoDialogComponent } from './components/post-an-update/add-photo-video-dialog/add-photo-video-dialog.component';
import { AddYoutubeVideoDialogComponent } from './components/post-an-update/add-youtube-video-dialog/add-youtube-video-dialog.component';
import { PostAnUpdateComponent } from './components/post-an-update/post-an-update.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';
import { ImportContactsDialogComponent } from './components/teams/import-contacts-dialog/import-contacts-dialog.component';
import { BeneficiaryFormComponent } from './components/withdrawal/beneficiary-form/beneficiary-form/beneficiary-form.component';
import { ConfirmPageComponent } from './components/withdrawal/beneficiary-form/confirm-page/confirm-page.component';
import { PersonalInfoSummaryComponent } from './components/withdrawal/personal-info-summary/personal-info-summary.component';
import { PersonalInfoComponent } from './components/withdrawal/personal-info/personal-info.component';
import { SuccessPageComponent } from './components/withdrawal/success-page/success-page.component';
import { WithdrwalComponent } from './components/withdrawal/withdrwal.component';
import { YoutubeVideoPlayerComponent } from './components/youtube-video-player/youtube-video-player.component';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { HttpHeaderInterceptor } from './interceptors/http-headers.interceptor';
import { MyMaterialModule } from './modules/material.module';
import { SharedModule } from './shared/shared.module';
import { HelpComponent } from './components/help/help.component';
import { StatComponent } from './components/fundraiser/fundraiser-detail-public/stat/stat.component';
import { FundraiserDetailPublicComponent } from './components/fundraiser/fundraiser-detail-public/fundraiser-detail-public.component';
import { HelpsComponent } from './components/help/helps/helps.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateFundraiserComponent,
    SetBasicInfoComponent,
    SetFundraiserMediaComponent,
    SetFundraiserStoryComponent,
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
    WithdrwalComponent,
    PersonalInfoComponent,
    PersonalInfoSummaryComponent,
    BeneficiaryFormComponent,
    FundraiserDetailPublicComponent,
    DonateComponent,
    DonationsComponent,
    BannerComponent,
    DonationsTabConntentComponent,
    InvitedContactsTabContentComponent,
    DonorsTabConntentComponent,
    TeamTabContentComponent,
    UpdatesTabContentComponent,
    NotificationComponent,
    OverviewComponent,
    DeleteDialogComponent,
    StoryComponent,
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
    HelpComponent,
    StatComponent,
    HelpsComponent,
    ImageCropperComponent,
  ],
  entryComponents: [],
  imports: [
    FormsModule,
    YouTubePlayerModule,
    BrowserModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    RouterModule,
    ShareButtonsModule.withConfig({
      debug: true,
    }),
    ShareIconsModule,
    NgxPayPalModule,
    ImageCropperModule,
    AdminModule,
    SharedModule,
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

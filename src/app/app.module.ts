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
import { EmailInviteDialogComponent } from './components/invite/email-invite-dialog/email-invite-dialog.component';
import { CreateFundriserComponent } from './components/fundriser/create-fundriser/create-fundriser.component';
import { SetFundriserGoalComponent } from './components/fundriser/create-fundriser/set-fundriser-goal/set-fundriser-goal.component';
import { SetFundriserMediaComponent } from './components/fundriser/create-fundriser/set-fundriser-media/set-fundriser-media.component';
import { SetFundriserStoryComponent } from './components/fundriser/create-fundriser/set-fundriser-story/set-fundriser-story.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PhoneInviteDialogComponent } from './components/invite/phone-invite-dialog/phone-invite-dialog.component';
import { AddPhotoVideoDialogComponent } from './components/post-an-update/add-photo-video-dialog/add-photo-video-dialog.component';
import { AddYoutubeVideoDialogComponent } from './components/post-an-update/add-youtube-video-dialog/add-youtube-video-dialog.component';
import { PostAnUpdateComponent } from './components/post-an-update/post-an-update.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddTeamMembersDialogComponent } from './components/teams/add-team-members-dialog/add-team-members-dialog.component';
import { ImportContactsDialogComponent } from './components/teams/import-contacts-dialog/import-contacts-dialog.component';
import { YoutubeVideoPlayerComponent } from './components/youtube-video-player/youtube-video-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { StoryTextAreaComponent } from './components/story-text-area/story-text-area.component';
import { FundriserListComponent } from './components/fundriser-list/fundriser-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WithdrwalComponent } from './components/withdrwal/withdrwal.component';
import { PersonalInfoComponent } from './components/withdrwal/personal-info/personal-info.component';
import { PersonalInfoSummaryComponent } from './components/withdrwal/personal-info-summary/personal-info-summary.component';
import { NgxEditorModule } from 'ngx-editor';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import {
  faFacebookSquare,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';
import { BeneficiaryFormComponent } from './components/withdrwal/beneficiary-form/beneficiary-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FudriserDetailPublicComponent } from './components/fundriser/fudriser-detail-public/fudriser-detail-public.component';
import { DonateComponent } from './components/donate/donate.component';
import { DoantionsComponent } from './components/fundriser/fudriser-detail-public/doantions/doantions.component';
import { TopDoantionsComponent } from './components/fundriser/fudriser-detail-public/top-doantions/top-doantions.component';
import { MyFundriserDetailComponent } from './components/fundriser/my-fundriser-detail/my-funriser-detail.component';
import { BannerComponent } from './components/fundriser/my-fundriser-detail/banner/banner.component';
import { DonationsTabConntentComponent } from './components/fundriser/my-fundriser-detail/donors-tab-conntent/donations-tab-conntent/donations-tab-conntent.component';
import { InvitedContactsTabContentComponent } from './components/fundriser/my-fundriser-detail/donors-tab-conntent/invited-contacts-tab-content/invited-contacts-tab-content.component';
import { DonorsTabConntentComponent } from './components/fundriser/my-fundriser-detail/donors-tab-conntent/donors-tab-conntent.component';
import { TeamTabContentComponent } from './components/fundriser/my-fundriser-detail/team-tab-content/team-tab-content.component';
import { UpdatesTabContentComponent } from './components/fundriser/my-fundriser-detail/updates-tab-content/updates-tab-content.component';
import { NotificationComponent } from './components/notification/notification.component';

const customConfig = {
  // prop: {
  //   facebook: {
  //     icon: ['fab', 'fa-facebook-official'],
  //     text: 'Share',
  //   },
  //   twitter: {
  //     icon: ['fab', 'fa-twitter-square'],
  //     text: 'Tweet',
  //   },
  //   // and so on...
  // },
};
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignInComponent,
    SignUpComponent,
    CreateFundriserComponent,
    SetFundriserGoalComponent,
    SetFundriserMediaComponent,
    SetFundriserStoryComponent,
    HomePageComponent,
    MyFundriserDetailComponent,
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
    FundriserListComponent,
    WithdrwalComponent,
    PersonalInfoComponent,
    PersonalInfoSummaryComponent,
    BeneficiaryFormComponent,
    FudriserDetailPublicComponent,
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
    ShareButtonsModule.withConfig(customConfig),
    ShareIconsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

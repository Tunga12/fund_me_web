import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { CreateFundriserComponent } from '../components/fundriser/create-fundriser/create-fundriser.component';
import { SetFundriserGoalComponent } from '../components/fundriser/set-fundriser-goal/set-fundriser-goal.component';
import { SetFundriserMediaComponent } from '../components/fundriser/set-fundriser-media/set-fundriser-media.component';
import { SetFundriserStoryComponent } from '../components/fundriser/set-fundriser-story/set-fundriser-story.component';
import { EmailInviteDialogComponent } from '../components/email-invite-dialog/email-invite-dialog.component';
import { ShareDialogComponent } from '../components/share-dialog/share-dialog.component';
import { DetailComponent } from '../components/fundriser/detail/detail.component';
import { PhoneInviteDialogComponent } from '../components/phone-invite-dialog/phone-invite-dialog.component';
import { PostAnUpdateComponent } from '../components/post-an-update/post-an-update.component';
import { AddPhotoVideoDialogComponent } from '../components/post-an-update/add-photo-video-dialog/add-photo-video-dialog.component';
import { AddYoutubeVideoDialogComponent } from '../components/post-an-update/add-youtube-video-dialog/add-youtube-video-dialog.component';
import { EditUiComponent } from '../components/edit-ui/edit-ui.component';
import { AddTeamMembersDialogComponent } from '../components/teams/add-team-members-dialog/add-team-members-dialog.component';
import { ImportContactsDialogComponent } from '../components/teams/import-contacts-dialog/import-contacts-dialog.component';
import { RouterModule } from '@angular/router';

const ROUTES = [
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'create-fundriser',
    component: CreateFundriserComponent,
  },
  {
    path: 'set-fundriser-goal',
    component: SetFundriserGoalComponent,
  },
  {
    path: 'set-fundriser-media',
    component: SetFundriserMediaComponent,
  },
  {
    path: 'set-fundriser-story',
    component: SetFundriserStoryComponent,
  },
  {
    path: 'home-page',
    component: HomePageComponent,
  },
  {
    path: 'fundriser-detail',
    component: DetailComponent,
  },
  {
    path: 'edit',
    component: EditUiComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutesModule {}

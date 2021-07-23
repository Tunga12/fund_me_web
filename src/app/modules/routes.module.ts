import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { CreateFundriserComponent } from '../components/fundriser/create-fundriser/create-fundriser.component';
import { SetFundriserGoalComponent } from '../components/fundriser/create-fundriser/set-fundriser-goal/set-fundriser-goal.component';
import { SetFundriserMediaComponent } from '../components/fundriser/create-fundriser/set-fundriser-media/set-fundriser-media.component';
import { SetFundriserStoryComponent } from '../components/fundriser/create-fundriser/set-fundriser-story/set-fundriser-story.component';
import { EditUiComponent } from '../components/edit-ui/edit-ui.component';
import { RouterModule } from '@angular/router';
import { PersonalInfoComponent } from '../components/withdrwal/personal-info/personal-info.component';
import { ShareDialogComponent } from '../components/share-dialog/share-dialog.component';
import { BeneficiaryFormComponent } from '../components/withdrwal/beneficiary-form/beneficiary-form.component';
import { WithdrwalComponent } from '../components/withdrwal/withdrwal.component';
import { PersonalInfoSummaryComponent } from '../components/withdrwal/personal-info-summary/personal-info-summary.component';
import { FudriserDetailPublicComponent } from '../components/fundriser/fudriser-detail-public/fudriser-detail-public.component';
import { DonateComponent } from '../components/donate/donate.component';
import { MyFundriserDetailComponent } from '../components/fundriser/my-fundriser-detail/my-funriser-detail.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { FundriserListComponent } from '../components/fundriser-list/fundriser-list.component';

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
    path: 'create',
    component: CreateFundriserComponent,
  },
  {
    path: 'create/set-fundriser-goal',
    component: SetFundriserGoalComponent,
  },
  {
    path: 'create/set-fundriser-media',
    component: SetFundriserMediaComponent,
  },
  {
    path: 'create/set-fundriser-story',
    component: SetFundriserStoryComponent,
  },
  {
    path: 'home-page',
    component: HomePageComponent,
  },
  {
    path: 'my-fundriser-detail',
    component: MyFundriserDetailComponent,
  },
  {
    path: 'fundriser-detail',
    component: FudriserDetailPublicComponent,
  },
  {
    path: 'edit',
    component: EditUiComponent,
  },
  {
    path: 'share',
    component: ShareDialogComponent,
  },
  {
    path: 'withdrawal/personal-info',
    component: PersonalInfoComponent,
  },
  {
    path: 'withdrawal/beneficiary-form',
    component: BeneficiaryFormComponent,
  },
  {
    path: 'withdrawal/personal-info-summary',
    component: PersonalInfoSummaryComponent,
  },
  {
    path: 'withdrawal',
    component: WithdrwalComponent,
  },
  {
    path: 'donate',
    component: DonateComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  {
    path: 'my-fundrisers',
    component: FundriserListComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutesModule {}

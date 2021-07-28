import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { CreateFundraiserComponent } from '../components/fundraiser/create-fundraiser/create-fundraiser.component';
import { EditUiComponent } from '../components/edit-ui/edit-ui.component';
import { RouterModule } from '@angular/router';
import { PersonalInfoComponent } from '../components/withdrwal/personal-info/personal-info.component';
import { ShareDialogComponent } from '../components/shared/share-dialog/share-dialog.component';
import { BeneficiaryFormComponent } from '../components/withdrwal/beneficiary-form/beneficiary-form.component';
import { WithdrwalComponent } from '../components/withdrwal/withdrwal.component';
import { PersonalInfoSummaryComponent } from '../components/withdrwal/personal-info-summary/personal-info-summary.component';
import { DonateComponent } from '../components/donate/donate.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { FundraiserListComponent } from '../components/fundraiser-list/fundraiser-list.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { MyFundraiserDetailComponent } from '../components/fundraiser/my-fundraiser-detail/my-fundraiser-detail.component';
import { FudraiserDetailPublicComponent } from '../components/fundraiser/fudraiser-detail-public/fudraiser-detail-public.component';

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
    component: CreateFundraiserComponent,
  },
  {
    path: 'home-page',
    component: HomePageComponent,
  },
  {
    path: 'my-fundraiser-detail/:id',
    component: MyFundraiserDetailComponent,
  },
  {
    path: 'fundraiser-detail/:id',
    component: FudraiserDetailPublicComponent,
  },
  {
    path: 'edit/:id',
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
    path: 'my-fundraisers/:userId',
    component: FundraiserListComponent,
  },

  { path: '', redirectTo: '/home-page', pathMatch: 'full' }, // redirect to `home page`
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutesModule {}

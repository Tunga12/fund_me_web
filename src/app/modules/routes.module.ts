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
import { AccountSettingComponent } from '../components/account-setting/account-setting.component';
import { SearchComponent } from '../components/search/search.component';
import { AuthGuard } from '../services/auth-guard/auth-guard.service';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'home-page',
    component: HomePageComponent,
  },
  {
    path: 'my-fundraiser-detail/:id',
    component: MyFundraiserDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fundraiser-detail/:id',
    component: FudraiserDetailPublicComponent,
  },
  {
    path: 'edit/:id',
    component: EditUiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'share',
    component: ShareDialogComponent,
  },
  {
    path: 'withdrawal/personal-info',
    component: PersonalInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'withdrawal/beneficiary-form',
    component: BeneficiaryFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'withdrawal/personal-info-summary',
    component: PersonalInfoSummaryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'withdrawal',
    component: WithdrwalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'donate/:id',
    component: DonateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-fundraisers/:userId',
    component: FundraiserListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account-setting',
    component: AccountSettingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 's',
    component: SearchComponent,
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

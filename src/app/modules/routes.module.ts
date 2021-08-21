import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from '../admin/components/admin-home/admin-home.component';
import { AdminWithdrawalsComponent } from '../admin/components/admin-withdrawals/admin-withdrawals.component';
import { ApprovedWithdrawalsComponent } from '../admin/components/admin-withdrawals/approved-withdrawals/approved-withdrawals.component';
import { PendingWithdrawalsComponent } from '../admin/components/admin-withdrawals/pending-withdrawals/pending-withdrawals.component';
import { RejectedWithdrawalsComponent } from '../admin/components/admin-withdrawals/rejected-withdrawals/rejected-withdrawals.component';
import { PaymentsComponent } from '../admin/components/payments/payments.component';
import { SideNavComponent } from '../admin/components/side-nav/side-nav.component';
import { StatisticsComponent } from '../admin/components/statistics/statistics.component';
import { AccountSettingComponent } from '../components/account-setting/account-setting.component';
import { DonateComponent } from '../components/donate/donate.component';
import { EditUiComponent } from '../components/edit-ui/edit-ui.component';
import { CreateFundraiserComponent } from '../components/fundraiser/create-fundraiser/create-fundraiser.component';
import {
  FudraiserDetailPublicComponent,
} from '../components/fundraiser/fudraiser-detail-public/fudraiser-detail-public.component';
import { MyFundraiserDetailComponent } from '../components/fundraiser/my-fundraiser-detail/my-fundraiser-detail.component';
import { BeneficiaryComponent } from '../components/fundraiser/my-fundraisers/beneficiary/beneficiary.component';
import { MyFundraisersComponent } from '../components/fundraiser/my-fundraisers/my-fundraisers.component';
import { OrganizerComponent } from '../components/fundraiser/my-fundraisers/organizer/organizer.component';
import { TeamMemberComponent } from '../components/fundraiser/my-fundraisers/team-member/team-member.component';
import { WithdrawalsComponent } from '../components/fundraiser/withdrawals/withdrawals.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { SearchComponent } from '../components/search/search.component';
import { ShareDialogComponent } from '../components/share-dialog/share-dialog.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import {
  BeneficiaryFormComponent,
} from '../components/withdrawal/beneficiary-form/beneficiary-form/beneficiary-form.component';
import {
  PersonalInfoSummaryComponent,
} from '../components/withdrawal/personal-info-summary/personal-info-summary.component';
import { PersonalInfoComponent } from '../components/withdrawal/personal-info/personal-info.component';
import { SuccessPageComponent } from '../components/withdrawal/success-page/success-page.component';
import { WithdrwalComponent } from '../components/withdrawal/withdrwal.component';
import { AuthGuard } from '../services/route-guards/auth-guard/auth-guard.service';
import { EditGuard } from '../services/route-guards/edit-guard/edit-guard.service';
import { WithdrawGuard } from '../services/route-guards/withdraw-guard/withdraw-guard.service';

const routes :Routes= [

  // admin routes
  {
    path: 'admin',
    component: SideNavComponent,
    // canActivate:[AdminAuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: AdminHomeComponent,
      }
      , {
        path: 'withdrawals',
        component: AdminWithdrawalsComponent,
        children: [
          { path: '', redirectTo: 'pending', pathMatch: 'full' },
          {
            path: 'pending',
            component: PendingWithdrawalsComponent
          }, {
            path: 'rejected',
            component: RejectedWithdrawalsComponent,
          }, {
            path: 'approved',
            component: ApprovedWithdrawalsComponent,
          }
        ]
      }

      , {
        path: 'payments',
        component: PaymentsComponent,
      }
      , {
        path: 'statistics',
        component: StatisticsComponent,
      }
    ]
  }
,
  // others


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
    canActivate: [AuthGuard, EditGuard],
  },
  {
    path: 'share',
    component: ShareDialogComponent,
  },

  /**withdrawal set up */
  {
    path: 'withdrawal/personal-info/:id',
    component: PersonalInfoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'withdrawal/beneficiary-form/:id',
    component: BeneficiaryFormComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'withdrawal/personal-info-summary/:id',
    component: PersonalInfoSummaryComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'withdrawal/setup/complete/:id',
    component: SuccessPageComponent
  },

  {
    path: 'withdrawal/:id',
    component: WithdrwalComponent,
    canActivate: [AuthGuard, WithdrawGuard],
  },


  {
    path: 'my-fundraiser/withdrawals/:id/:tab',
    component: WithdrawalsComponent,
    canActivate: [AuthGuard, WithdrawGuard],
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
    path: 'my-fundraisers',
    component: MyFundraisersComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'organizer',
        component: OrganizerComponent,
      }, {
        path: 'team-member',
        component: TeamMemberComponent,
      }, {
        path: 'beneficiary',
        component: BeneficiaryComponent,
      }
    ]
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
  imports: [CommonModule, RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
})
export class AppRoutesModule { }

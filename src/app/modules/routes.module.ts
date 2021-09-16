import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpsComponent } from '../components/help/helps/helps.component';

import { AccountSettingComponent } from '../components/account-setting/account-setting.component';
import { DonateComponent } from '../components/donate/donate.component';
import { EditUiComponent } from '../components/edit-ui/edit-ui.component';
import { CreateFundraiserComponent } from '../components/fundraiser/create-fundraiser/create-fundraiser.component';
import { FundraiserDetailPublicComponent } from '../components/fundraiser/fundraiser-detail-public/fundraiser-detail-public.component';
import { MyFundraiserDetailComponent } from '../components/fundraiser/my-fundraiser-detail/my-fundraiser-detail.component';
import { BeneficiaryComponent } from '../components/fundraiser/my-fundraisers/beneficiary/beneficiary.component';
import { MyFundraisersComponent } from '../components/fundraiser/my-fundraisers/my-fundraisers.component';
import { OrganizerComponent } from '../components/fundraiser/my-fundraisers/organizer/organizer.component';
import { TeamMemberComponent } from '../components/fundraiser/my-fundraisers/team-member/team-member.component';
import { WithdrawalsComponent } from '../components/fundraiser/withdrawals/withdrawals.component';
import { HelpComponent } from '../components/help/help.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { ShareDialogComponent } from '../components/share-dialog/share-dialog.component';
import {
  BeneficiaryFormComponent,
} from '../components/withdrawal/beneficiary-form/beneficiary-form/beneficiary-form.component';
import {
  PersonalInfoSummaryComponent,
} from '../components/withdrawal/personal-info-summary/personal-info-summary.component';
import { PersonalInfoComponent } from '../components/withdrawal/personal-info/personal-info.component';
import { SuccessPageComponent } from '../components/withdrawal/success-page/success-page.component';
import { WithdrawalComponent } from '../components/withdrawal/withdrawal.component';
import { AuthGuard } from '../services/route-guards/auth-guard/auth-guard.service';
import { EditGuard } from '../services/route-guards/edit-guard/edit-guard.service';
import { WithdrawGuard } from '../services/route-guards/withdraw-guard/withdraw-guard.service';

const routes: Routes = [
 
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
    component: FundraiserDetailPublicComponent,
  },
  {
    path: 'edit/:id',
    component: EditUiComponent,
    canActivate: [AuthGuard, 
      // EditGuard
    ],
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
    component: WithdrawalComponent,
    canActivate: [AuthGuard,
      //  WithdrawGuard
      ],
  },


  {
    path: 'my-fundraiser/withdrawals/:id/:tab',
    component: WithdrawalsComponent,
    canActivate: [AuthGuard, 
      // WithdrawGuard
    ],
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
      },
      {
        path: '',
        redirectTo:'organizer',
        pathMatch:'full'
      },
    ]
  },
  {
    path:'help/category/:category',
    component:HelpsComponent,
  },
  {
    path:'help',
    component:HelpComponent,
  },
  {
    path: 'account-setting',
    component: AccountSettingComponent,
    canActivate: [AuthGuard],
  },
  
  { path: '', redirectTo: '/home-page', pathMatch: 'full' }, // redirect to `home page`
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes),
],
  exports: [RouterModule],
})
export class AppRoutesModule { }

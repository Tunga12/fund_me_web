import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatTableExporterModule } from 'mat-table-exporter';

import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminWithdrawalsComponent } from './components/admin-withdrawals/admin-withdrawals.component';
import {
    ApprovedWithdrawalsComponent,
} from './components/admin-withdrawals/approved-withdrawals/approved-withdrawals.component';
import {
    PendingWithdrawalsComponent,
} from './components/admin-withdrawals/pending-withdrawals/pending-withdrawals.component';
import {
    RejectedWithdrawalsComponent,
} from './components/admin-withdrawals/rejected-withdrawals/rejected-withdrawals.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AdminAuthGuard } from './services/admin-auth-guard/admin-auth-guard.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { HelpsComponent } from './components/helps/helps.component';
import { HelpFormComponent } from './components/help-form/help-form.component';

const routes: Routes =
    [
        {
            path: 'admin',
            component: SideNavComponent,
            canActivate: [AdminAuthGuard],
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
                , {
                    path: 'helps',
                    component: HelpsComponent,
                }

            ]
        }];


@NgModule({
    declarations: [
        SideNavComponent,
        StatisticsComponent,
        PaymentsComponent,
        PendingWithdrawalsComponent,
        ApprovedWithdrawalsComponent,
        RejectedWithdrawalsComponent,
        AdminWithdrawalsComponent,
        AdminHomeComponent,
        HelpFormComponent,
        HelpsComponent        
    ],

    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        MatTableExporterModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule
    ],
    
    exports: [
        RouterModule,
    ]

})
export class AdminModule { }

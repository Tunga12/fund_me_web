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
import { HelpsComponent } from './components/helps/helps.component';
import { HelpFormComponent } from './components/help-form/help-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuard } from '../services/route-guards/auth-guard/auth-guard.service';
import { ImportExcelComponent } from './components/import-excel/import-excel.component';
import { UsersComponent } from './components/users/users.component';
import { ReportedFundraisersComponent } from './components/reported-fundraisers/reported-fundraisers.component';

const routes: Routes =
    [
        {
            path: 'admin',
            component: SideNavComponent,
            canActivate: [AdminAuthGuard, AuthGuard],
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
                        },
                        {
                            path:'',
                            redirectTo:'pending',
                            pathMatch:'full'
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
                
                , {
                    path: 'upload',
                    component: ImportExcelComponent,
                },
                {
                    path:'users',
                    component:UsersComponent
                }
                ,
                {
                    path:'reports',
                    component:ReportedFundraisersComponent
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
        HelpsComponent,
        ImportExcelComponent,
        UsersComponent,
        ReportedFundraisersComponent,
    ],

    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        MatTableExporterModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FontAwesomeModule
    ],
    
    exports: [
        RouterModule,
    ]

})
export class AdminModule { }

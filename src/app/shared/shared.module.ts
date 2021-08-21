import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicFundListComponent } from '../components/fundraiser-list/public-fund-list/public-fund-list.component';
import { MyMaterialModule } from '../modules/material.module';
import { TimeagoModule } from 'ngx-timeago';
import { AppRoutesModule } from '../modules/routes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PublicFundListComponent
  ],
  imports: [
    CommonModule,
    TimeagoModule.forChild(),
    MyMaterialModule,
    AppRoutesModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  exports:[
    FlexLayoutModule,
    PublicFundListComponent,
    MyMaterialModule,
    ReactiveFormsModule,
    AppRoutesModule,
  ]
})
export class SharedModule { }
